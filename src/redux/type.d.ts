import { AppState } from './reducers/app/app';
import { AuthState, UIState, UserState, OrderState, TransactionState } from './reducers/types';

type Action = {
  type: string;
  payload?: string | any;
  key?: string | number | symbol | any;
  alternateKey?: string | number | symbol | any;
  _id?: string;
  value?: unknown;
  meta?: any;
};


type ResponseSuccess = {
  status_code: number;
  success: boolean;
  message: string;
};

type ResponseError = {
  status_code: number;
  error: {
    code: number;
    message: string;
  };
  errors: any[];
};


type RootApplicationState = {
  app: AppState;
};

type RootState = {
  app: RootApplicationState;
  auth: AuthState;
  ui: UIState;
  order: OrderState,
  transaction: TransactionState,
  user: UserState
}
  

type ListResponseType = {
  status_code: number;
  success: boolean;
  pagination: {
    totalCount: number;
    perPage: number;
    current: number;
    currentPage: string;
    next: string;
    previous: string;
  };
};

export { Action, ListResponseType, ResponseError, ResponseSuccess, RootState };
