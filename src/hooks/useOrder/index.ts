import { useDispatch, useSelector } from 'react-redux';
import { setCurrentOrder, findOrders, getOrder, updateOrder } from '../../redux/actions';
import { ActionOption } from '../../redux/actions/type';
import { RootState } from '../../redux/type';
import { get as LodashGet } from 'lodash';
import { useEffect } from 'react';
import { createOrder } from '../../redux/actions/order/create-order';


export type OrderProps = {
  initialKey?: string;
  key?: string;
  userId?: string;
  params?: Record<string, any> | any;
  doFind?: boolean;
};

export type OrderType = {
  byId: OrderNameSpace.Order | Record<string, any>;
  byList: OrderNameSpace.Order[] | Record<string, any>[];
  current?: OrderNameSpace.Order | Record<string, any>;
  readonly setCurrent: (
    key: string,
    current: OrderNameSpace.Order | Record<string, any>
  ) => void;
  readonly create: (
    payload: Record<string, any>,
    key: string,
    options?: ActionOption
  ) => void;
  readonly findAll: (key: string, options?: ActionOption) => void;
  readonly findOne: (uid: string, key: string, options?: ActionOption) => void;
  readonly update: (
    uid: string,
    key: string,
    payload: Record<string, any>,
    options?: ActionOption
  ) => void;
  // readonly deleteOne: (
  //   uid: string,
  //   key: string,
  //   options?: ActionOption
  // ) => void;
  readonly metadata: (
    key: string
  ) => {
    loading: boolean;
    pagination: Record<string, any>;
  };
  readonly get: (
    key: string
  ) => {
    readonly byList: OrderNameSpace.Order[];
    readonly byId: OrderNameSpace.Order | Record<string, any>;
    readonly current: OrderNameSpace.Order | Record<string, any> | null;
  };
};

export const useOrder = (props?: OrderProps): OrderType => {
  const { key, params, doFind = false } = props ?? {};
  const dispatch = useDispatch();

  const defaultOptions: ActionOption = {
    key,
    params,
  };
  const { byId, byList, current, uiLoaders, pagination } = useSelector(
    ({ order, ui }: RootState) => ({
      byId: order?.byId,
      byList: order?.byList,
      current: order?.current || undefined,
      uiLoaders: ui?.uiLoaders,
      pagination: ui?.pagination,
    })
  );

  const create = (
    payload: Record<string, any>,
    key: string,
    options?: ActionOption
  ) => {
    dispatch(createOrder(payload, { ...defaultOptions, ...options, key }));
  };

  const findAll = (key: string, options?: ActionOption) => {
    dispatch(findOrders({ ...defaultOptions, ...options, key }));
  };

  const findOne = (id: string, key: string, options?: ActionOption) => {
    dispatch(getOrder(id, { ...defaultOptions, ...options, key }));
  };

  const update = (
    uid: string,
    key: string,
    payload: Record<string, any>,
    options?: ActionOption
  ) => {
    dispatch(updateOrder(uid, payload, { ...defaultOptions, ...options, key }));
  };
  
  // const deleteOne = (uid: string, key: string, options?: ActionOption) => {
  //   dispatch(deleteOrder(id, { ...defaultOptions, ...options, key }));
  // };

  const metadata = (key: string) => ({
    loading: LodashGet(uiLoaders, key, false),
    pagination: LodashGet(pagination, key, {}),
  });

  const setCurrent = (
    key: string,
    current:  OrderNameSpace.Order | Record<string, any>
  ) => {
    dispatch(setCurrentOrder(key, current));
  };

  useEffect(() => {
    if (doFind) {
      dispatch(findOrders({ ...defaultOptions }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doFind]);

  const get = (key: string) => {
    return {
      current: LodashGet<
        Record<string,  OrderNameSpace.Order>,
        string,
        OrderNameSpace.Order | {}
      >(current, key, {}),
      byList: LodashGet<
        Record<string, any>,
        string,
        OrderNameSpace.Order[] | Record<string, any>[]
      >(byList, key, []),
      byId: LodashGet<
        Record<string, Record<string,  OrderNameSpace.Order>>,
        string,
        Record<string,  OrderNameSpace.Order>
      >(byId, key, {}),
    };
  };

  return {
    byList,
    current,
    byId,
    create,
    update,
    findAll,
    findOne,
    metadata,
    get,
    setCurrent,
  };
};
