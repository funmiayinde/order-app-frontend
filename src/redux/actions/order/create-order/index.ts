import { createActionType } from '../../../../_shared/ui/redux';
import { ActionOption } from '../../type';

export const CREATE_ORDER = createActionType('CREATE_ORDER', 'ORDER');

export const createOrder = (
  payload: Record<string, any>,
  options?: ActionOption
) => ({
    type: CREATE_ORDER.START,
    meta: {
        ...options,
        payload,
    }
});
