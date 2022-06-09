import { login, LOGIN } from './index';

describe('LOGIN Actions', () => {
  it('should create an action to login', () => {
    const loginAuth = {
      email: 'name@example.com',
      password: 'password',
      key: 'test-key',
      onFinish: () => {console.log('onFinish')},
    };

    const { email, password, key, onFinish } = loginAuth;

    const expectedAction = {
      type: LOGIN.START,
      meta: {
        payload: { email, password },
        key,
        onFinish,
      },
    };
    expect(login({ email, password }, { key, onFinish })).toEqual(
      expectedAction
    );
  });
});
