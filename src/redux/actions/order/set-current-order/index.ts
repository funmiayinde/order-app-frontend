import { createActionString } from '../../../../_shared/ui/redux';

export const SET_CURRENT_ORDER = createActionString('SET_CURRENT_ORDER', 'ORDER');

export const setCurrentOrder = (
  key: string,
  current: OrderNameSpace.Order|  Record<string, any>,
) => ({
  type: SET_CURRENT_ORDER,
  payload: current,
  key,
});
