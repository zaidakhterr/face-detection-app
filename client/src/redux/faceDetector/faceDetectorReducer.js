import { DETECT_IMAGE, INCORRECT_URL } from './faceDetectorActionTypes';

const initialState = {
  imageUrl: '',
  faces: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case DETECT_IMAGE:
      return { ...state, ...payload };

    case INCORRECT_URL:
      return { ...initialState };

    default:
      return state;
  }
};
