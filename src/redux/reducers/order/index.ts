import {
  GET_ORDER,
  UPDATE_ORDER,
  FIND_ORDERS,
  CREATE_ORDER,
  SET_CURRENT_ORDER,
} from '../../actions/order';
import { arrayToById } from '../../../_shared/ui/redux';
import { Action, OrderState } from '../types';

export const initialOrderState: OrderState = {
  byId: {},
  byList: [],
  current: {},
};

const orderReducer = (state = initialOrderState, action: Action) => {
  const { payload, key } = action;
  switch (action.type) {
    case FIND_ORDERS.SUCCESS: {
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
    case GET_ORDER.SUCCESS:
    case CREATE_ORDER.SUCCESS:
    case UPDATE_ORDER.SUCCESS: {
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
    case SET_CURRENT_ORDER: {
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

export default orderReducer;
