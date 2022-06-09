import { createLogger } from 'redux-logger';
import customMiddlewares from './middlewares';
import { persistReducer, persistStore } from 'redux-persist';
import appReducers from './reducers';
import { UIDefaultState } from './reducers/app/ui';
import { assign } from 'lodash';
import { RESET_APP_STATE } from './actions';
import storage from 'redux-persist/lib/storage';
import { Action } from './reducers/types';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from '@reduxjs/toolkit';

const persistConfig = {
  key: process.env.NEXT_PUBLIC_NAME as string,
  storage,
  whitelist: ['ui', 'auth'],
};

const rootReducer = (state: any, action: Action) => {
  if (action.type === RESET_APP_STATE) {
    state = {
      ui: assign({}, UIDefaultState, {
        preference: {
          notificationSound: true,
        },
      }),
    };
  }
  return appReducers(state, action);
};

const perisistedReducer = persistReducer(persistConfig, rootReducer);

// add the middleWares
const middleWares = [...customMiddlewares];

if (process.env.NODE_ENV !== 'production') {
  middleWares.push(createLogger());
}

// apply the middleware
const middleware = composeWithDevTools(applyMiddleware(...middleWares));

// create the store
const store = createStore(perisistedReducer, middleware);

// persisted store
const persistor = persistStore(store);

export { store, persistor };
