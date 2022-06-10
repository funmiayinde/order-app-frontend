import { logout, LOGOUT } from './index';

describe('Logout Actions', () => {
  it('should create an action to logout', () => {
    const expectedAction = {
      type: LOGOUT,
    };
    expect(logout()).toEqual(expectedAction);
    expect(LOGOUT).toEqual('@@auth/LOGOUT');
  });
});
