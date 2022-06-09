import { get, isEmpty, isFunction, isString } from 'lodash';
import toast from 'react-hot-toast';
import { AnyAction, Dispatch, Middleware } from 'redux';
import { batch } from 'react-redux';
import {
  API_REQUEST,
  startUILoading,
  stopUILoading,
  uiSetPagination,
  updateUIError,
  setSessionToken,
  GET,
  ApiRequest,
  FIREBASE_REQUEST,
} from '../../../actions';
import { Action, RootState } from '../../../type';
import { createAPIRequest } from '../../../../services/axios';
import router from 'next/router';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';

export const alertSuccess = (successMessage: string) => {
  toast.success(successMessage);
};

export const alertError = (errorMessage: string) => {
  toast.error(errorMessage);
};

interface HandleErrorParams {
  error: { message: string; messages: string[] };
  dispatch: Dispatch;
  key: string;
  noErrorMessage: boolean;
  errorMessage: string;
}

export const loadStartUpAction: Middleware<unknown, RootState> = () => next => (
  action: Action
) => {
  next(action);
};

const processFirebaseResponse = (
  dispatch: Dispatch<AnyAction>,
  meta: any,
  response: UserCredential
) => {
  const { key, successMessage, noSuccessMessage, onSuccess, onFinish } = meta;
  batch(() => {
    const { user } = response;
    if (response && response.user) {
      console.log('token:', user.getIdToken());
      dispatch(setSessionToken(user.getIdToken()));
    }
    if (onSuccess) {
      if (isFunction(onSuccess)) {
        onSuccess(user);
      }
    } else {
      dispatch({ type: onSuccess, payload: user, key });
    }
    //call onfinish
    if (onFinish && typeof onFinish === 'function') {
      console.log('onFinished-here:', onFinish);
      onFinish(user);
    }

    dispatch(stopUILoading(key));
    const notificationMessage = successMessage || meta?.message;
    if (!noSuccessMessage && notificationMessage) {
      alertSuccess(notificationMessage);
    }
  });
};

const processFirebaseErrorResponse = (
  dispatch: Dispatch<AnyAction>,
  meta: any,
  error: any
) => {
  console.log('firebase-err-1:', error);
  const { key, noErrorMessage, errorMessage, onError } = meta;
  const errMessage: Record<string, any> = {
    'auth/wrong-password': 'Please check the Password',
    'auth/user-not-found': 'Please check the Email',
    'auth/email-already-in-use': 'Email Already in Use',
  }
  batch(() => {
    const showErrorMessage = (errMsg: string) => {
      if (!noErrorMessage && errMsg) {
        alertError(errMsg);
      }
    };
    if (onError) {
      if (isFunction(onError)) {
        onError(error);
      } else {
        const message = errMessage[error.code] ?? 'There was a problem, please try again';
        dispatch(updateUIError(key, message));
        showErrorMessage(message);
      }
    } else {
      const err = errMessage[error.code] || {
        message: 'Please check your internet connection.',
      };
      console.log('firebase-err:', err);
      dispatch(updateUIError(key, errorMessage || err.message));
      showErrorMessage(errorMessage ?? err.message);
    }
    dispatch(stopUILoading(key));
  });
};

export const firebaseRequest: Middleware<unknown, RootState> = ({
  dispatch,
}) => next => (action: Action) => {
  if (action.type === FIREBASE_REQUEST.START) {
    const { meta } = action;
    const { key, payload } = meta;
    batch(() => {
      dispatch(updateUIError(key, null));
      dispatch(startUILoading(key));
    });
    const firebaseFunc: Record<string, Record<string, Function>> = {
      login: {
        func: signInWithEmailAndPassword,
      },
      signUp: {
        func: createUserWithEmailAndPassword,
      },
    };
    firebaseFunc[key]
      .func(getAuth(), get(payload, 'email'), get(payload, 'password'))
      .then((response: UserCredential) => {
        processFirebaseResponse(dispatch, meta, response);
      })
      .catch((err: any) => {
        processFirebaseErrorResponse(dispatch, meta, err);
      });
  }
  return next(action);
};

export const httpRequest: Middleware<unknown, RootState> = ({
  dispatch,
}) => next => (action: Action) => {
  // const router = useRouter();
  if (action.type === API_REQUEST.START) {
    const {
      method,
      url,
      key,
      payload,
      onError,
      successMessage,
      params,
      onSuccess,
      onFinish,
      nextRoute,
      errorMessage,
      noErrorMessage,
      noSuccessMessage = false,
      metadata = false,
      useErrorSound = true,
      onAfterError,
    } = action.meta as Record<any, any> | ApiRequest;
    console.log('meta-data:', { ...action.meta });
    const config = { method, url, data: undefined, params: undefined };
    if ((payload && !isEmpty(payload)) || payload instanceof FormData) {
      config.data = payload;
    }
    if (params && !isEmpty(params)) {
      config.params = params;
    }
    batch(() => {
      dispatch(updateUIError(key, null));
      dispatch(startUILoading(key));
    });
    createAPIRequest(config)
      .then((response: any) => {
        const { data } = response;
        console.log('response:', response);
        console.log('data:', data);
        const meta = response?.meta || null;
        batch(() => {
          if (meta && meta.pagination) {
            dispatch(uiSetPagination(key, meta.pagination));
          }
          if (meta && meta.token) {
            console.log('token:', meta.token);
            dispatch(setSessionToken(meta.token));
          }
          if (onSuccess) {
            if (isFunction(onSuccess)) {
              if (metadata) {
                onSuccess(response);
              } else {
                onSuccess(data);
              }
            } else if (metadata) {
              dispatch({
                type: onSuccess,
                payload: response,
                key,
              });
            } else {
              dispatch({ type: onSuccess, payload: data, key });
            }
            //call onfinish
            if (onFinish && typeof onFinish === 'function') {
              console.log('onFinished-here:', onFinish);
              onFinish(data);
            }
          } else {
            if (metadata) {
              console.log('response:', response);
              dispatch({ type: onSuccess, payload: response });
            } else {
              dispatch({ type: onSuccess, payload: data });
            }
          }
          if (nextRoute) {
            if (isFunction(nextRoute)) {
              nextRoute();
            }
            if (isString(nextRoute)) {
              router.push(nextRoute);
            }
          }
          dispatch(stopUILoading(key));
          const notificationMessage = successMessage || meta?.message;
          if (!noSuccessMessage && notificationMessage) {
            alertSuccess(notificationMessage);
          }
        });
      })
      .catch((error: any) => {
        console.log('api-error:', error?.data);
        batch(() => {
          const showErrorMessage = (errMsg: string) => {
            if (!noErrorMessage && method.toLowerCase() !== GET && errMsg) {
              alertError(errMsg);
            }
          };
          if (onError) {
            if (isFunction(onError)) {
              onError(error);
            } else {
              const message =
                errorMessage ??
                error.message ??
                'There was a problem, please try again';
              dispatch(updateUIError(key, message));
              showErrorMessage(message);
            }
          } else {
            const err = (error &&
              error?.data &&
              error?.data?.meta &&
              error?.data?.meta?.error) ||
              (error && error.error) ||
              error || { message: 'Please check your internet connection.' };
            console.log('api-error-2:', err);
            dispatch(updateUIError(key, errorMessage || err.message));
            showErrorMessage(errorMessage ?? err.message);
          }
          dispatch(stopUILoading(key));
          if (isFunction(onAfterError)) {
            onAfterError(error);
          }
        });
      });
  }
  return next(action);
};
