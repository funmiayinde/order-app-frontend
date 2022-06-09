import { Middleware } from 'redux';
import { API } from '../../../../_shared/util/_urls';
import { httpRequest, PUT, UPDATE_USER } from '../../../actions';
import { Action, RootState } from '../../../type';

export const updateUser: Middleware<unknown, RootState> = ({ dispatch }) => (
  next: (action: Action) => void
) => (action: Action) => {
  next(action);
  const { type } = action;
  if (type === UPDATE_USER.START) {
    const { key, _id, ...rest } = action.meta;
    dispatch(
      httpRequest({
        method: PUT,
        url: `${API.USERS}/${_id}`,
        key: key || 'updateUser',
        ...rest,
        onSuccess: (data: any) => {
          dispatch({ type: UPDATE_USER.SUCCESS, payload: data, key });
        },
      })
    );
  }
};
