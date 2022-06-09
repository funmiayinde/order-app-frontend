import { createActionType } from '../../../../_shared/ui/redux';
import { ActionOption } from '../../type';

export const SIGN_UP = createActionType('SIGN_UP', 'AUTH');

export const signUp = (payload: any, options?: ActionOption) => ({
  type: SIGN_UP.START,
  meta: { payload, ...options },
});
