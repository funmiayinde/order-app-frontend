import { createActionType } from '../../../../_shared/ui/redux';
import { ActionOption } from '../../type';

export const UPDATE_ORDER = createActionType('UPDATE_ORDER', 'ORDER');

export const updateOrder = (
  _id: string,
  payload: Record<string, any>,
  options?: ActionOption
) => ({
  type: UPDATE_ORDER.START,
  meta: {
    _id,
    ...options,
    payload,
  },
});
