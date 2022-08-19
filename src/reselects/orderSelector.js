import { createSelector } from "reselect";

const getOrderState = (state) => state.orderState;

export const selectOrderParams = () =>
  createSelector(getOrderState, (orderState) => orderState.params);

export const selectOrderList = () =>
  createSelector(getOrderState, (orderState) => orderState.orderList);

export const selectOrderDetail = () =>
  createSelector(getOrderState, (orderState) => orderState.orderDetail);
