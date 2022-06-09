import { createActionType } from '../../../../_shared/ui/redux';
import { ActionOption } from '../../type';

export const DELETE_USER = createActionType('DELETE_USER', 'USER');

export const deleteUser = (_id: string, options?: ActionOption) => ({
  type: DELETE_USER.START,
  meta: {
    _id,
    ...options,
  },
});
