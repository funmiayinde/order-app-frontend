import { createActionType } from '../../../../_shared/ui/redux';
import { ActionOption } from '../../type';

export const LOGIN = createActionType('LOGIN', 'AUTH');

export const login = (payload: any, options?: ActionOption) => ({
  type: LOGIN.START,
  meta: { payload, ...options },
});
