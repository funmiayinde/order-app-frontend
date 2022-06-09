import { ActionOption } from '../../redux/actions/type';

export type UseAuthReturnType = {
  authData: UserNameSpace.Auth | Record<string, any>;
  sessionToken: string;
  handleLogin: (
    payload: Record<'email' & 'password', string>,
    options: ActionOption
  ) => void;
  handleSignUp: (
    payload: Record<'email' & 'password' & 'confirm_password', string>,
    options: ActionOption
  ) => void;
  handleLogout: () => void;
};

export type AuthPropsType = {
  key?: string;
  doFind?: boolean;
};
