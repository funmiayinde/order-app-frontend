export type T = Record<string, any>;

export interface UIState {
  uiErrors: T;
  uiLoaders: T;
  pagination: T;
}

export interface AuthState {
  auth: T;
  sessionToken: string;
}

export interface AppSetUpState {
  appSetUp: T;
}

export interface UserState {
  byId: T;
  current: T ;
  byList: T[];
}

export interface OrderState {
  byId: T;
  current: T ;
  byList: T[];
}

export type Action = {
  type: string | null;
  payload?: any;
  key?: string | number | symbol | any;
  value?: any;
  meta: any;
  _id?: string;
};
