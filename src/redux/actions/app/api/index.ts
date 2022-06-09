import {
  createActionString,
  createActionType,
} from '../../../../_shared/ui/redux';

export const RESET_APP_STATE = createActionString('RESET_APP_STATE', 'APP');
export const API_REQUEST = createActionType('API_REQUEST', 'APP');
export const FIREBASE_REQUEST = createActionType('FIREBASE_REQUEST', 'APP');

type T = Record<string, any>;

export type ApiRequest = {
  /**
   * RESET API request method
   * */
  method?: 'get' | 'post' | 'put' | 'delete' | 'patch';

  /**
   * Request URL
   * */
  url?: string;

  /**
   * Request Key(identification, used to handle loading state and error state)
   * */
  key?: string;

  /**
   * Data sent to the API
   * */
  payload?: any;

  /**
   * Success message
   */
  successMessage?: string;

  /**
   * URL query parameters
   */
  params?: any;

  /**
   * Function called after request returns with an successfully
   * @param data
   */
  nextRoute?: string;

  /**
   * Error message
   */
  errorMessage?: string;

  /**
   * Used to prevent a success message after an API request
   */
  noSuccessMessage?: boolean;

  /**
   * Used to prevent a error message after an API request
   */
  noErrorMessage?: boolean;

  /**
   * Used to return the metadata from an API request
   */
  metadata?: boolean;

  /**
   * Used to return the metadata from an API request
   */
  useErrorSound?: boolean;

  /**
   * Function is called after an error is met
   */
  onAfterError?: Function;

  /**
   * Function called after request returns with an successfully
   * @param data
   * */
  onSuccess?: ((data?: T | Array<T>) => void) | string;

  /** function called after successful http request
   * @param data
   */
  onFinish?: ((data?: T | Array<T>) => void) | string;

  /**
   * Function called after request returns with an error
   * @param error
   */
  onError?: ((error?: any) => void) | string;
};

export const httpRequest = (meta: ApiRequest) => ({
  type: API_REQUEST.START,
  meta,
});

export const firebaseRequest = (meta: {
  key?: string;
  payload?: any;
  onError?: ((error?: any) => void) | string;
  successMessage?: string;
  noSuccessMessage?: string;
  errorMessage?: string;
  onSuccess?: ((data?: T | Array<T>) => void) | string;
  onFinish?: ((data?: T | Array<T>) => void) | string;
}) => ({
  type: FIREBASE_REQUEST.START,
  meta,
});
