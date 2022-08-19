import { createSelector } from "reselect";

const getPurchaseState = (state) => state.purchaseState;

export const selectPurchaseParams = () =>
  createSelector(getPurchaseState, (purchaseState) => purchaseState.params);

export const selectPurchaseList = () =>
  createSelector(
    getPurchaseState,
    (purchaseState) => purchaseState.purchaseList
  );

export const selectPurchaseDetail = () =>
  createSelector(getPurchaseState, (purchaseState) => purchaseState.purchaseDetail);
