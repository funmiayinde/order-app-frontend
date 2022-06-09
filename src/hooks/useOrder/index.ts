import { useDispatch, useSelector } from 'react-redux';
import { setCurrentOrder, findOrders, getOrder } from '../../redux/actions';
import { ActionOption } from '../../redux/actions/type';
import { RootState } from '../../redux/type';
import { get as LodashGet } from 'lodash';
import { useEffect } from 'react';


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
  readonly findAll: (key: string, options?: ActionOption) => void;
  readonly findOne: (_id: string, key: string, options?: ActionOption) => void;
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

  const findAll = (key: string, options?: ActionOption) => {
    dispatch(findOrders({ ...defaultOptions, ...options, key }));
  };

  const findOne = (id: string, key: string, options?: ActionOption) => {
    dispatch(getOrder(id, { ...defaultOptions, ...options, key }));
  };

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
    findAll,
    findOne,
    metadata,
    get,
    setCurrent,
  };
};
