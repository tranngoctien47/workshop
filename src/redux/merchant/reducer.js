import { createReducer } from "reduxsauce";
import { Types } from "./actions";

const INITIAL_STATE = {
  isFetching: false,
  merchantList: [],
  merchantDetail: {},
};

export const merchantListAction = (state = INITIAL_STATE, action) => ({
  ...state,
  isFetching: true,
});

export const merchantListSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isFetching: false,
  merchantList: action.data.data,
});

export const createMerchantAction = (state = INITIAL_STATE, action) => ({
  ...state,
  isFetching: true,
});

export const createMerchantSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isFetching: false,
});

export const updateStatusMerchantAction = (state = INITIAL_STATE, action) => ({
  ...state,
  isFetching: true,
});

export const updateStatusMerchantSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isFetching: false,
});

export const merchantDetilAction = (state = INITIAL_STATE, action) => ({
  ...state,
  isFetching: true,
});

export const merchantDetailSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isFetching: false,
  merchantDetail: action.data,
});

export const merchantFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  isFetching: false,
});

export const HANDLERS = {
  [Types.MERCHANT_LIST_ACTION]: merchantListAction,
  [Types.MERCHANT_LIST_SUCCESS]: merchantListSuccess,
  [Types.MERCHANT_CREATE_ACTION]: createMerchantAction,
  [Types.MERCHANT_CREATE_SUCCESS]: createMerchantSuccess,
  [Types.MERCHANT_DETAIL_ACTION]: merchantDetilAction,
  [Types.MERCHANT_DETAIL_SUCCESS]: merchantDetailSuccess,
  [Types.MERCHANT_UPDATE_STATUS_ACTION]: updateStatusMerchantAction,
  [Types.MERCHANT_UPDATE_STATUS_SUCCESS]: updateStatusMerchantSuccess,
  [Types.MERCHANT_FAILURE]: merchantFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
