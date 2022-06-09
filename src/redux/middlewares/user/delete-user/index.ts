import { Middleware } from 'redux';
import { API } from '../../../../_shared/util/_urls';
import { DELETE, DELETE_USER, httpRequest } from '../../../actions';
import { Action, RootState } from '../../../type';

export const deleteUser: Middleware<unknown, RootState> = ({ dispatch }) => (
  next: (action: Action) => void
) => (action: Action) => {
  next(action);
  const { type } = action;
  if (type === DELETE_USER.START) {
    const { key, _id, ...rest } = action.meta;
    dispatch(
      httpRequest({
        method: DELETE,
        url: `${API.USERS}/${_id}`,
        key: key || 'deleteUser',
        ...rest,
        onSuccess: (data: any) => {
          dispatch({ type: DELETE_USER.SUCCESS, payload: data, key });
        },
      })
    );
  }
};
