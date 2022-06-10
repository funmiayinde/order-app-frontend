import { Middleware } from 'redux';
import { API } from '../../../../_shared/util/_urls';
import {
  FIND_ORDERS,
  GET,
  httpRequest,
  RESET_APP_STATE,
} from '../../../actions';
import { Action, RootState } from '../../../type';

export const findOrders: Middleware<unknown, RootState> = ({ dispatch }) => (
  next: (action: Action) => void
) => (action: Action) => {
  next(action);
  const { type } = action;
  if (type === FIND_ORDERS.START) {
    const { key, ...rest } = action.meta;
    dispatch(
      httpRequest({
        method: GET,
        url: API.ORDERS,
        key: key || 'findOrders',
        ...rest,
        onSuccess: (data: any) => {
          dispatch({ type: FIND_ORDERS.SUCCESS, payload: data, key });
        },
        onAfterError: (err: any) => {
          if (err && err.status && err.status === 500) {
            dispatch({ type: RESET_APP_STATE });
          }
        },
      })
    );
  }
};
