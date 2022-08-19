import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import OrderAction from "../redux/order/actions";

export const GetOrderListCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (params) =>
            dispatch(OrderAction.orderListAction(params)),
        [dispatch]
    );
};

export const GetOrderDetailCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (orderCode) =>
            dispatch(OrderAction.orderDetailAction(orderCode)),
        [dispatch]
    );
};

export const GetOrderDetailAdminCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (orderCode, type) =>
            dispatch(OrderAction.orderAdminDetailAction(orderCode, type)),
        [dispatch]
    );
};

export const UpdateOrderStatusAdminCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (orderCode, typeOrder, params, paramsList) =>
            dispatch(OrderAction.orderAdminUpdateStatusAction(orderCode, typeOrder, params, paramsList)),
        [dispatch]
    );
};