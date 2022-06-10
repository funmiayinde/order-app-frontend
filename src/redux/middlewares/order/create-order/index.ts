import { Middleware } from 'redux';
import { API } from '../../../../_shared/util/_urls';
import { CREATE_ORDER, httpRequest, POST } from '../../../actions';
import { CREATE_USER } from '../../../actions/user/create-user';
import { Action, RootState } from '../../../type';

export const createOrder: Middleware<unknown, RootState> = ({ dispatch }) => (
  next: (action: Action) => void
) => (action: Action) => {
  next(action);
  const { type } = action;
  if (type === CREATE_ORDER.START) {
    const { key, ...rest } = action.meta;
    dispatch(
      httpRequest({
        method: POST,
        url: API.ORDERS,
        key: key || 'createOrder',
        ...rest,
        onSuccess: (data: any) => {
          dispatch({ type: CREATE_ORDER.SUCCESS, payload: data, key });
        },
      })
    );
  }
};
