import { Middleware } from 'redux';
import { ApiRequest, firebaseRequest, SIGN_UP } from '../../../actions';
import { Action, RootState } from '../../../type';

export const signUp: Middleware<unknown, RootState> = ({ dispatch }) => (
  next: (action: Action) => void
) => (action: Action) => {
  next(action);
  if (action.type === SIGN_UP.START) {
    const { key, onFinish, payload } = action.meta as ApiRequest;
    dispatch(
      firebaseRequest({
        key: key || 'signUp',
        onFinish,
        payload,
        onSuccess: SIGN_UP.SUCCESS,
      })
    );
  }
};
