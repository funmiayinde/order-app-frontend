import { createActionType } from '../../../../_shared/ui/redux';
import { ActionOption } from '../../type';

export const FIND_ORDERS = createActionType('FIND_LOANS', 'ORDER');

export const findOrders = (options?: ActionOption) => ({
  type: FIND_ORDERS.START,
  meta: {
    ...options,
  },
});
