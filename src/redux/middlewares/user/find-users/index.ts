import { Middleware } from 'redux';
import { API } from '../../../../_shared/util/_urls';
import { FIND_USERS, GET, httpRequest } from '../../../actions';
import { Action, RootState } from '../../../type';

export const findUsers: Middleware<unknown, RootState> = ({ dispatch }) => (
  next: (action: Action) => void
) => (action: Action) => {
  next(action);
  const { type } = action;
  if (type === FIND_USERS.START) {
    const { key, ...rest } = action.meta;
    dispatch(
      httpRequest({
        method: GET,
        url: API.USERS,
        key: key || 'findUsers',
        ...rest,
        onSuccess: (data: any) => {
          dispatch({ type: FIND_USERS.SUCCESS, payload: data, key });
        },
      })
    );
  }
};
