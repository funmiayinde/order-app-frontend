import { useDispatch, useSelector } from 'react-redux';
import {  login, signUp } from '../../redux/actions';
import { ActionOption } from '../../redux/actions/type';
import { RootState } from '../../redux/type';
import { AuthPropsType, UseAuthReturnType } from './types';

export const useAuth = (props: AuthPropsType): UseAuthReturnType => {
  const dispatch = useDispatch();
  const { authData, sessionToken } = useSelector(({ auth }: RootState) => ({
    authData: auth.auth,
    sessionToken: auth?.sessionToken,
  }));

  const handleLogin = (
    payload: Record<'email' & 'password', string>,
    options?: ActionOption
  ) => dispatch(login(payload, { ...options }));
  
  const handleSignUp = (
    payload: Record<'email' & 'password', string>,
    options?: ActionOption
  ) => dispatch(signUp(payload, { ...options }));


  const handleLogout = () => {
    // dispatch(logout());
  };

  return {
    authData,
    sessionToken,
    handleLogin,
    handleSignUp,
    handleLogout,
  };
};
