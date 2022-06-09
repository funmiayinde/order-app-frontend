import { createActionType } from '../../../../_shared/ui/redux';
import { ActionOption } from '../../type';

export const UPDATE_USER = createActionType('UPDATE_USER', 'USER');

export const updateUser = (
  _id: string,
  payload: Record<string, any>,
  options?: ActionOption
) => ({
  type: UPDATE_USER.START,
  meta: {
    _id,
    ...options,
    payload,
  },
});
