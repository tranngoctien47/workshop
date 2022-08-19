import { createSelector } from "reselect";

const getInventoryState = (state) => state.inventoryState;
const getAuthorizationState = (state) => state.authorizationState;
const getMerchantState = (state) => state.merchantState;
const getUserState = (state) => state.userState;
const getOrderState = (state) => state.orderState;
const getMarketplaceState = (state) => state.marketplaceState;
const getChatState = (state) => state.chatState;
const getPurchase = (state) => state.purchaseState;
const getRequest = (state) => state.requestState;

//========== INVENTORY ===========//
export const selectFetchingInventory = () =>
  createSelector(
    getInventoryState,
    (inventoryState) => inventoryState?.isFetching
  );

export const selectFetchingInventoryCountStatus = () =>
  createSelector(
    getInventoryState,
    (inventoryState) => inventoryState?.isFetchingCountStatus
  );

//========== Authorization ===========//
export const selectFetchingAuthorization = () =>
  createSelector(
    getAuthorizationState,
    (authorizationState) => authorizationState?.isFetching
  );

//========== Merchant ===========//
export const selectFetchingMerchant = () =>
  createSelector(
    getMerchantState,
    (merchantState) => merchantState?.isFetching
  );

//========== User ===========//
export const selectFetchingUser = () =>
  createSelector(getUserState, (userState) => userState?.isFetching);

//========== ORDER ===========//
export const selectFetchingOrder = () =>
  createSelector(getOrderState, (orderState) => orderState?.isFetching);

//========== MARKETPLACE ===========//
export const selectFetchingMarketplace = () =>
  createSelector(
    getMarketplaceState,
    (marketplaceState) => marketplaceState?.isFetching
  );

//========== CHAT ===========//
export const selectFetchingChat = () =>
  createSelector(getChatState, (chatState) => chatState?.isFetching);

export const selectFetchingChatDetail = () =>
  createSelector(getChatState, (chatState) => chatState?.isFetchingDetail);

export const selectFetchingSendMessageChat = () =>
  createSelector(getChatState, (chatState) => chatState?.isFetchingSendMessage);

//========== PURCHASE ===========//
export const selectFetchingpPurchase = () =>
  createSelector(getPurchase, (purchaseState) => purchaseState?.isFetching);

//========== REQUEST ===========//
export const selectFetchingpRequest = () =>
  createSelector(getRequest, (requestState) => requestState?.isFetching);
