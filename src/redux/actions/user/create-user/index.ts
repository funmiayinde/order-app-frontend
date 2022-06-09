import { createActionType } from '../../../../_shared/ui/redux';
import { ActionOption } from '../../type';

export const CREATE_USER = createActionType('CREATE_USER', 'USER');

export const createUser = (
  payload: Record<string, any>,
  options?: ActionOption
) => ({
    type: CREATE_USER.START,
    meta: {
        ...options,
        payload,
    }
});
