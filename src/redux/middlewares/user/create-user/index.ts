import { Middleware } from 'redux';
import { API } from '../../../../_shared/util/_urls';
import { httpRequest, POST } from '../../../actions';
import { CREATE_USER } from '../../../actions/user/create-user';
import { Action, RootState } from '../../../type';

export const createUser: Middleware<unknown, RootState> = ({ dispatch }) => (
  next: (action: Action) => void
) => (action: Action) => {
  next(action);
  const { type } = action;
  if (type === CREATE_USER.START) {
    const { key, ...rest } = action.meta;
    dispatch(
      httpRequest({
        method: POST,
        url: API.USERS,
        key: key || 'createUser',
        ...rest,
        onSuccess: (data: any) => {
          dispatch({ type: CREATE_USER.SUCCESS, payload: data, key });
        },
      })
    );
  }
};
