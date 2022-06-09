import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import order from './order';
import user from './user';

const appReducers = combineReducers({
  ...app,
  auth,
  user,
  order,
});

export default appReducers;
