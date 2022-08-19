import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import PurchaseAction from "../redux/purchase/actions";

export const GetPurchaseListCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (params) =>
            dispatch(PurchaseAction.purchaseListAction(params)),
        [dispatch]
    );
};

export const GetPurchaseDetailCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (purchaseCode) =>
            dispatch(PurchaseAction.purchaseDetailAction(purchaseCode)),
        [dispatch]
    );
};