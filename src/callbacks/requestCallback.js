import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import RequestAction from "../redux/request/actions";

export const GetRequestListCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (params) =>
            dispatch(RequestAction.requestListAction(params)),
        [dispatch]
    );
};

// export const GetPurchaseDetailCallback = () => {
//     const dispatch = useDispatch();
//     return useCallback(
//         (purchaseCode) =>
//             dispatch(PurchaseAction.purchaseDetailAction(purchaseCode)),
//         [dispatch]
//     );
// };