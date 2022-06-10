/* eslint-disable import/no-anonymous-default-export */
import { createOrder } from './create-order';
import { findOrders } from './find-orders';
import { getOrder } from './get-order';
import { updateOrder } from './update-order';

export default [createOrder, findOrders, getOrder, updateOrder];
