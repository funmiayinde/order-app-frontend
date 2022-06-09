import { useDispatch, useSelector } from 'react-redux';
import {
  createUser,
  deleteUser,
  findUsers,
  getUser,
  setCurrentUser,
  updateUser,
} from '../../redux/actions';
import { ActionOption } from '../../redux/actions/type';
import { RootState } from '../../redux/type';
import { get as LodashGet } from 'lodash';
import { useEffect } from 'react';

export type UserProps = {
  initialKey?: string;
  key?: string;
  userId?: string;
  params?: Record<string, any> | any;
  doFind?: boolean;
};

export type UserType = {
  byId: UserNameSpace.User | Record<string, any>;
  byList: UserNameSpace.User[] | Record<string, any>[];
  current?: UserNameSpace.User | Record<string, any>;
  readonly  setCurrent: (
    key: string,
    current: UserNameSpace.User | Record<string, any>,
  ) => void;
  readonly create: (
    payload: Record<string, any>,
    key: string,
    options?: ActionOption
  ) => void;
  readonly update: (
    _id: string,
    key: string,
    payload: Record<string, any>,
    options?: ActionOption
  ) => void;
  readonly findAll: (key: string, options?: ActionOption) => void;
  readonly findOne: (_id: string, key: string, options?: ActionOption) => void;
  readonly deleteOne: (
    _id: string,
    key: string,
    options?: ActionOption
  ) => void;
  readonly metadata: (
    key: string
  ) => {
    loading: boolean;
    pagination: Record<string, any>;
  };
  readonly get: (
    key: string
  ) => {
    readonly byList: UserNameSpace.User[] | Record<string, any>[];
    readonly byId: UserNameSpace.User | Record<string, any>;
    readonly current: UserNameSpace.User | Record<string, any> | null;
  };
};

export const useUser = (props?: UserProps): UserType => {
  const { key, params, doFind = false } = props ?? {};
  const dispatch = useDispatch();

  const defaultOptions: ActionOption = {
    key,
    params,
  };
  const { byId, byList, current, uiLoaders, pagination } = useSelector(
    ({ user, ui }: RootState) => ({
      byId: user?.byId,
      byList: user?.byList,
      current: user?.current || undefined,
      uiLoaders: ui?.uiLoaders,
      pagination: ui?.pagination,
    })
  );

  const create = (
    payload: Record<string, any>,
    key: string,
    options?: ActionOption
  ) => {
    dispatch(createUser(payload, { ...defaultOptions, ...options, key }));
  };

  const update = (
    id: string,
    key: string,
    payload: Record<string, any>,
    options?: ActionOption
  ) => {
    dispatch(updateUser(id, payload, { ...defaultOptions, ...options, key }));
  };

  const findAll = (key: string, options?: ActionOption) => {
    dispatch(findUsers({ ...defaultOptions, ...options, key }));
  };

  const findOne = (id: string, key: string, options?: ActionOption) => {
    dispatch(getUser(id, { ...defaultOptions, ...options, key }));
  };
  
  const deleteOne = (id: string, key: string, options?: ActionOption) => {
    dispatch(deleteUser(id, { ...defaultOptions, ...options, key }));
  };

  const metadata = (key: string) => ({
    loading: LodashGet(uiLoaders, key, false),
    pagination: LodashGet(pagination, key, {}),
  });

  const setCurrent = (key: string, current: UserNameSpace.User |  Record<string, any>) => {
    dispatch(setCurrentUser(key, current));
  } 

  // useEffect(() => {
  //   if (doFind) {
  //     dispatch(findUsers({ ...defaultOptions }));
  //   }
  // }, [doFind]);

  const get = (key: string) => {
    return {
      current: LodashGet<
        Record<string, UserNameSpace.User>,
        string,
        UserNameSpace.User | {}
      >(current, key, {}),
      byList: LodashGet<
        Record<string, any>,
        string,
        UserNameSpace.User[] | Record<string, any>[]
      >(byList, key, []),
      byId: LodashGet<
        Record<string, Record<string, UserNameSpace.User>>,
        string,
        Record<string, UserNameSpace.User>
      >(byId, key, {}),
    };
  };

  return {
    create,
    byList,
    current,
    byId,
    deleteOne,
    findAll,
    findOne,
    update,
    metadata,
    get,
    setCurrent,
  };
};
