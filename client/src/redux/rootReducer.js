import { combineReducers } from 'redux';

import error from './error/errorReducer';
import auth from './auth/authReducer';

export default combineReducers({ error, auth });
