import { Middleware } from 'redux';
import { LOGOUT, RESET_APP_STATE } from '../../../actions';
import { Action, RootState } from '../../../type';

export const logout: Middleware<unknown, RootState> = ({ dispatch }) => (
  next: (action: Action) => void
) => (action: Action) => {
  next(action);
  const { type } = action;
  if (type === LOGOUT) {
    dispatch({ type: RESET_APP_STATE });
  }
};
