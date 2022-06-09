import { Middleware } from 'redux';
import { API } from '../../../../_shared/util/_urls';
import { GET, GET_ORDER, httpRequest } from '../../../actions';
import { Action, RootState } from '../../../type';

export const getOrder: Middleware<unknown, RootState> = ({ dispatch }) => (
  next: (action: Action) => void
) => (action: Action) => {
  next(action);
  const { type } = action;
  if (type === GET_ORDER.START) {
    const { key, uid, ...rest } = action.meta;
    dispatch(
      httpRequest({
        method: GET,
        url: `${API.ORDERS}/${uid}`,
        key: key || 'getOrder',
        ...rest,
        onSuccess: (data: any) => {
          dispatch({ type: GET_ORDER.SUCCESS, payload: data, key });
        },
      })
    );
  }
};
