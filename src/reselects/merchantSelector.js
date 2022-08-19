import { createSelector } from "reselect";

const getMerchantState = (state) => state.merchantState;

export const selectMerchantList = () =>
  createSelector(getMerchantState, (merchantState) => merchantState.merchantList);

export const selectMerchantDetail = () =>
  createSelector(getMerchantState, (merchantState) => merchantState.merchantDetail);
