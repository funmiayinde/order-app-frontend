import { cleanup } from '@testing-library/react';
import { ReactChild, ReactChildren } from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { useUI } from './index';
import { renderHook } from '@testing-library/react-hooks';

const store = configureMockStore([])({});

describe('Test hooks: useLocalStorage', () => {
  afterEach(() => {
    cleanup();
  });

  const Wrapper= ({ children }: { children: ReactChild | ReactChildren }) => (
    <Provider store={store}>{children}</Provider>
  );
  // render hooks from library
  const { result } = renderHook(() => useUI(), { wrapper: Wrapper });
  it('result default values', () => {
      expect(typeof result.current.uiLoaders).toBe('undefined');
      expect(result).toBeDefined();
  });
});


