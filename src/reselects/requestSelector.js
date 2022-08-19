import { createSelector } from "reselect";

const getRequestState = (state) => state.requestState;

export const selectRequestParams = () =>
  createSelector(getRequestState, (requestState) => requestState.params);

export const selectRequestList = () =>
  createSelector(
    getRequestState,
    (requestState) => requestState.requestList
  );

// export const selectPurchaseDetail = () =>
//   createSelector(getPurchaseState, (purchaseState) => purchaseState.purchaseDetail);
