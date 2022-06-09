import { LOGIN, SESSION_TOKEN, SIGN_UP } from '../../actions';
import { Action, AuthState } from '../types';

export const AuthDefaultState: AuthState = {
  auth: {},
  sessionToken: '',
};

const AuthReducer = (state = AuthDefaultState, action: Action) => {
  switch (action.type) {
    case LOGIN.SUCCESS:
    case SIGN_UP.SUCCESS:
      return Object.assign({}, { ...state }, { auth: action.payload });
    case SESSION_TOKEN:
      return Object.assign({}, { ...state }, { sessionToken: action.value });
    default:
      return state;
  }
};

export default AuthReducer;
