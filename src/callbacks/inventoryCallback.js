import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import InventoryAction from "../redux/inventory/actions";

export const GetInventoryListCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (params) =>
            dispatch(InventoryAction.inventoryListAction(params)),
        [dispatch]
    );
};

export const GetInventoryDetailCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (code) =>
            dispatch(InventoryAction.inventoryDetailAction(code)),
        [dispatch]
    );
};

export const GetInventoryCountStatusCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        () =>
            dispatch(InventoryAction.inventoryCountStatusAction()),
        [dispatch]
    );
};

export const InventoryDeleteCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (code, params, callback) =>
            dispatch(InventoryAction.inventoryDeleteAction(code, params, callback)),
        [dispatch]
    );
};

export const CreateInventoryCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (params, callback) =>
            dispatch(InventoryAction.inventoryCreateAction(params, callback)),
        [dispatch]
    );
};

export const UpdateInventoryCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (params, code, callback) =>
            dispatch(InventoryAction.inventoryUpdateAction(params, code, callback)),
        [dispatch]
    );
};