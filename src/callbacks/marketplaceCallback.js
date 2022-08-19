import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import MarketplaceAction from "../redux/marketplace/actions";

export const GetMarketplaceListCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (params) =>
            dispatch(MarketplaceAction.marketplaceListAction(params)),
        [dispatch]
    );
};

export const GetMarketplaceDetailCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (code) =>
            dispatch(MarketplaceAction.marketplaceDetailAction(code)),
        [dispatch]
    );
};

export const UpdateMarketplaceBookingCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (params) =>
            dispatch(MarketplaceAction.marketplaceBookingSuccess(params)),
        [dispatch]
    );
};

export const CreateMarketplaceBookingCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (params, callback) =>
            dispatch(MarketplaceAction.marketplaceBookingCreateAction(params, callback)),
        [dispatch]
    );
};