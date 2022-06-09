import { Middleware } from 'redux';
import { API } from '../../../../_shared/util/_urls';
import { httpRequest, PUT, UPDATE_ORDER } from '../../../actions';
import { Action, RootState } from '../../../type';

export const updateOrder: Middleware<unknown, RootState> = ({ dispatch }) => (
  next: (action: Action) => void
) => (action: Action) => {
  next(action);
  const { type } = action;
  if (type === UPDATE_ORDER.START) {
    const { key, uid, ...rest } = action.meta;
    dispatch(
      httpRequest({
        method: PUT,
        url: `${API.USERS}/${uid}`,
        key: key || 'updateOrder',
        ...rest,
        onSuccess: (data: any) => {
          dispatch({ type: UPDATE_ORDER.SUCCESS, payload: data, key });
        },
      })
    );
  }
};
