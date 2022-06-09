import { Middleware } from 'redux';
import { ApiRequest, firebaseRequest, httpRequest, LOGIN, POST } from '../../../actions';
import { Action, RootState } from '../../../type';

export const login: Middleware<unknown, RootState> = ({ dispatch }) => (
  next: (action: Action) => void
) => (action: Action) => {
  next(action);
  if (action.type === LOGIN.START) {
    const { key, onFinish, payload } = action.meta as ApiRequest;
    dispatch(
      firebaseRequest({
        key: key || 'login',
        onFinish,
        payload,
        onSuccess: LOGIN.SUCCESS,
      })
    );
  }
};
