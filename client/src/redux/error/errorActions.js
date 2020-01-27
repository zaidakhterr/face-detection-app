import { GET_ERRORS, CLEAR_ERRORS } from './errorActionTypes';

export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  };
};

export const clearErrors = () => ({ type: CLEAR_ERRORS });
