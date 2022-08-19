import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import MerchantAction from "../redux/merchant/actions";

export const GetMerchantListCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (params) =>
            dispatch(MerchantAction.merchantListAction(params)),
        [dispatch]
    );
};

export const CreateMerchantCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (params, callback) =>
            dispatch(MerchantAction.merchantCreateAction(params, callback)),
        [dispatch]
    );
};

export const UpdateStatusMerchantCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (params, codeMerchant, callback) =>
            dispatch(MerchantAction.merchantUpdateStatusAction(params, codeMerchant, callback)),
        [dispatch]
    );
};

export const GetMerchantDetailCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (merchantCode) =>
            dispatch(MerchantAction.merchantDetailAction(merchantCode)),
        [dispatch]
    );
};