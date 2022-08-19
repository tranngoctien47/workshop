import { createSelector } from "reselect";

const getInventoryState = (state) => state.inventoryState;

export const selectInventoryParams = () =>
    createSelector(getInventoryState, (inventoryState) => inventoryState.params);

export const selectInventoryList = () =>
    createSelector(
        getInventoryState,
        (inventoryState) => inventoryState.inventoryList
    );

export const selectInventoryDetail = () =>
    createSelector(
        getInventoryState,
        (inventoryState) => inventoryState.inventoryDetail
    );

export const selectInventoryCountStatus = () =>
    createSelector(
        getInventoryState,
        (inventoryState) => inventoryState.listStatus
    );
