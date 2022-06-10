import { createActionString } from '../../../../_shared/ui/redux';

export const LOGOUT = createActionString('LOGOUT', 'AUTH');

export const logout = () => ({
  type: LOGOUT,
});
