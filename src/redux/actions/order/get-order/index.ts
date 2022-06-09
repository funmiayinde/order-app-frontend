import { createActionType } from '../../../../_shared/ui/redux';
import { ActionOption } from '../../type';

export const GET_ORDER = createActionType('GET_ORDER', 'ORDER');

export const getOrder = (_id: string, option?: ActionOption) => ({
  type: GET_ORDER.START,
  meta: {
    _id,
    ...option,
  },
});
