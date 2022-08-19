import {createReducer} from "reduxsauce";
import {Types} from "./actions";
import { PAGINATION, TYPE_ORDER } from "./../../consts/Enum"

const INITIAL_STATE = {
    isFetching: false,
    orderList: [],
    params: {
        page: PAGINATION.page,
        recordPerPage: PAGINATION.recordPerPage,
        status: "all",
        type: TYPE_ORDER.BUYER_DEALER
    },
    orderDetail: {}
};

export const orderListAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const orderListSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
    params: {...state.params,...action.data.params},
    orderList: action.data.data,
})

export const orderDetailAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const orderDetailSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
    orderDetail: action.data,
})

export const orderAdminDetailAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const orderAdminDetailSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
    orderDetail: action.data,
})

export const orderFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
    isFetchingCountStatus: false
})

export const orderAdminUpdateStatusAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const orderAdminUpdateStatusSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
})

export const preOrderInoAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const preOrderInoSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
})

export const HANDLERS = {
    [Types.ORDER_LIST_ACTION]: orderListAction,
    [Types.ORDER_LIST_SUCCESS]: orderListSuccess,
    [Types.ORDER_DETAIL_ACTION]: orderDetailAction,
    [Types.ORDER_DETAIL_SUCCESS]: orderDetailSuccess,
    [Types.ORDER_ADMIN_DETAIL_ACTION]: orderAdminDetailAction,
    [Types.ORDER_ADMIN_DETAIL_SUCCESS]: orderAdminDetailSuccess,
    [Types.ORDER_ADMIN_UPDATE_STATUS_ACTION]: orderAdminUpdateStatusAction,
    [Types.ORDER_ADMIN_UPDATE_STATUS_SUCCESS]: orderAdminUpdateStatusSuccess,
    [Types.PRE_ORDER_INFO_ACTION]: preOrderInoAction,
    [Types.PRE_ORDER_INFO_SUCCESS]: preOrderInoSuccess,
    [Types.ORDER_FAILURE]: orderFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);