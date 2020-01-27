import axios from 'axios';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from './authActionTypes';
import { tokenConfig } from './authUtility';
import { returnErrors } from '../error/errorActions';

//logout user
export const logout = () => ({ type: LOGOUT_SUCCESS });

//check token and load user
export const loadUser = () => (dispatch, getState) => {
  //user loading
  dispatch({ type: USER_LOADING });

  axios
    .get('api/users/profile', tokenConfig(getState))
    .then(res => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch(err => {
      const { data, status } = err.response;
      dispatch(returnErrors(data.msg, status));
      dispatch({ type: AUTH_ERROR });
    });
};

//register user
export const register = ({ name, email, password }) => dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  axios
    .post('/api/users/register', body, config)
    .then(res => dispatch({ type: REGISTER_SUCCESS, payload: res.data }))
    .catch(err => {
      const { data, status } = err.response;
      dispatch(returnErrors(data.msg, status, REGISTER_FAIL));
      dispatch({ type: REGISTER_FAIL });
    });
};

//login user
export const login = ({ email, password }) => dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  axios
    .post('/api/users/signin', body, config)
    .then(res => dispatch({ type: LOGIN_SUCCESS, payload: res.data }))
    .catch(err => {
      const { data, status } = err.response;
      dispatch(returnErrors(data.msg, status, LOGIN_FAIL));
      dispatch({ type: LOGIN_FAIL });
    });
};
