import { createActionString } from '../../../../_shared/ui/redux';

export const SET_CURRENT_USER = createActionString('SET_CURRENT_USER', 'USER');

export const setCurrentUser = (
  key: string,
  current: UserNameSpace.User |  Record<string, any>,
) => ({
  type: SET_CURRENT_USER,
  payload: current,
  key,
});
