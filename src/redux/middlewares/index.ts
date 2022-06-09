/* eslint-disable import/no-anonymous-default-export */
import app from './app';
import auth from './auth';
import user from './user';
import order from './order';

export default [...app, ...auth, ...user, ...order,];
