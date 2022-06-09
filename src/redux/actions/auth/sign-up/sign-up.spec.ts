import { signUp, SIGN_UP } from './index';

describe('LOGIN Actions', () => {
  it('should create an action to login', () => {
    const loginAuth = {
      email: 'name@example.com',
      password: 'password',
      confirm_password: 'password',
      key: 'test-key',
      onFinish: () => {console.log('onFinish')},
    };

    const { email, password, key, onFinish } = loginAuth;

    const expectedAction = {
      type: SIGN_UP.START,
      meta: {
        payload: { email, password },
        key,
        onFinish,
      },
    };
    expect(signUp({ email, password }, { key, onFinish })).toEqual(
      expectedAction
    );
  });
});
