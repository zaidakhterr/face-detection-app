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

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOADING:
      return { ...state, isLoading: true };

    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: payload,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isLoading: false,
        isAuthenticated: true,
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
};
