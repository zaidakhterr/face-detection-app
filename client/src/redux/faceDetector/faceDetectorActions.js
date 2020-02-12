import axios from 'axios';

import { USER_LOADED, USER_LOADING, AUTH_ERROR } from '../auth/authActionTypes';
import { DETECT_IMAGE, INCORRECT_URL } from './faceDetectorActionTypes';

import { returnErrors } from '../error/errorActions';
import { tokenConfig } from '../auth/authUtility';

import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '8f4c9873aca34521ae7f757babeb06f4',
});

export const getImage = imageUrl => (dispatch, getState) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, imageUrl)
    .then(response => {
      let faces = calculateFacePosition(
        response.outputs[0].data.regions.map(
          region => region.region_info.bounding_box
        )
      );
      dispatch({
        type: DETECT_IMAGE,
        payload: { imageUrl, faces },
      });

      dispatch({ type: USER_LOADING });

      let id = JSON.stringify(getState().auth.user._id);
      axios
        .patch('api/users/profile', { id }, tokenConfig(getState))
        .then(res => dispatch({ type: USER_LOADED, payload: res.data }))
        .catch(err => {
          const { data, status } = err.response;
          dispatch(returnErrors(data.msg, status));
          dispatch({ type: AUTH_ERROR });
        });
    })

    .catch(err => {
      alert('Incorrect Image URL');
      returnErrors('Incorrect Image URL', 404, 'INCORRECT_URL');
      dispatch({ type: INCORRECT_URL });
    });
};

const calculateFacePosition = data => {
  const image = document.getElementById('image');
  const width = Number(image.width);
  const height = Number(image.height);
  const faces = data.map(face => ({
    left: face.left_col * width,
    top: face.top_row * height,
    right: width - face.right_col * width,
    bottom: height - face.bottom_row * height,
  }));
  return faces;
};
