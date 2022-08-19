import { createSelector } from "reselect";

const getMarketplaceState = (state) => state.marketplaceState;

export const selectMarketplaceParams = () =>
  createSelector(
    getMarketplaceState,
    (marketplaceState) => marketplaceState.params
  );

export const selectMarketplaceList = () =>
  createSelector(
    getMarketplaceState,
    (marketplaceState) => marketplaceState.marketplaceList
  );

export const selectMarketplaceDetail = () =>
  createSelector(
    getMarketplaceState,
    (marketplaceState) => marketplaceState.marketplaceDetail
  );

export const selectMarketBooking = () =>
  createSelector(
    getMarketplaceState,
    (marketplaceState) => marketplaceState.marketBooking
  );

export const selectMarketplaceInfoOrder = () =>
  createSelector(
    getMarketplaceState,
    (marketplaceState) => marketplaceState.infoOrder
  );
