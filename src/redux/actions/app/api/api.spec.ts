import { POST } from '../../index';
import { ApiRequest, API_REQUEST, httpRequest } from './index';

describe('Http Request Action', () => {
  it('Should test http request returns the correct data with the actual payload', () => {
    const meta: ApiRequest = {
        method: POST,
        url: '/test',
    };
    const expectedAction = {
        type: API_REQUEST.START,
        meta,
    };
    expect(httpRequest(meta)).toEqual(expectedAction);
  });
});
