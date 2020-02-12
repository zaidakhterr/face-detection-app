import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import error from './error/errorReducer';
import auth from './auth/authReducer';
import faceDetector from './faceDetector/faceDetectorReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['faceDetector'],
};

const appReducer = combineReducers({ error, auth, faceDetector });

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    state = {};
  }

  return appReducer(state, action);
};

export default persistReducer(persistConfig, rootReducer);
