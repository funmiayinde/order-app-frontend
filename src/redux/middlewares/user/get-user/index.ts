import { Middleware } from 'redux';
import { API } from '../../../../_shared/util/_urls';
import { GET, GET_USER, httpRequest } from '../../../actions';
import { Action, RootState } from '../../../type';

export const getUser: Middleware<unknown, RootState> = ({ dispatch }) => (
  next: (action: Action) => void
) => (action: Action) => {
  next(action);
  const { type } = action;
  if (type === GET_USER.START) {
    const { key, _id, ...rest } = action.meta;
    dispatch(
      httpRequest({
        method: GET,
        url: `${API.USERS}/${_id}`,
        key: key || 'getUser',
        ...rest,
        onSuccess: (data: any) => {
          dispatch({ type: GET_USER.SUCCESS, payload: data, key });
        },
      })
    );
  }
};
