import { SET_CURRENT_USER } from './../../actions/user/set-current-user/index';
import { arrayToById } from '../../../_shared/ui/redux';
import {
  CREATE_USER,
  DELETE_USER,
  FIND_USERS,
  GET_USER,
  UPDATE_USER,
} from '../../actions';
import { Action, UserState } from '../types';

export const UserDefaultState: UserState = {
  byId: {},
  byList: [],
  current: {},
};

const userReducer = (state = UserDefaultState, action: Action) => {
  const { payload, key } = action;
  switch (action.type) {
    case FIND_USERS.SUCCESS: {
      const byIdFind = arrayToById(payload || []);
      return Object.assign({}, state, {
        byId: {
          ...state.byId,
          [key]: byIdFind,
        },
        byList: {
          ...state.byList,
          [key]: Object.values(byIdFind),
        },
        current: {
          ...state.current,
          [key]: {},
        },
      });
    }
    case GET_USER.SUCCESS:
    case CREATE_USER.SUCCESS:
    case UPDATE_USER.SUCCESS: {
      const byIdCreate = {
        ...state.byId[key],
        [payload._id]: payload,
      };
      return Object.assign({}, state, {
        byId: {
          ...state.byId,
          [key]: byIdCreate,
        },
        byList: {
          ...state.byList,
          [key]: Object.values(byIdCreate),
        },
        current: {
          ...state.current,
          [key]: payload,
        },
      });
    }
    case DELETE_USER.SUCCESS: {
      const byId = { ...state.byId[key] };
      delete byId[payload._id];
      return Object.assign({}, state, {
        byId: {
          ...state.byId,
          [key]: byId,
        },
        byList: {
          ...state.byList,
          [key]: Object.values(byId),
        },
        current: null,
      });
    }
    case SET_CURRENT_USER: {
      return {
        ...state,
        current: {
          ...state.current,
          [key]: payload,
        },
      };
    }
    default:
      return state;
  }
};

export default userReducer;
