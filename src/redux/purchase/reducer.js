import {createReducer} from "reduxsauce";
import {Types} from "./actions";
import { PAGINATION } from "./../../consts/Enum"

const INITIAL_STATE = {
    isFetching: false,
    purchaseList: [],
    params: {
        page: PAGINATION.page,
        recordPerPage: PAGINATION.recordPerPage,
    },
    purchaseDetail: {}
};

export const purchaseListAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const purchaseListSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
    params: {...state.params,...action.data.params},
    purchaseList: action.data.data,
})

export const purchaseDetailAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const purchaseDetailSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
    purchaseDetail: action.data,
})

export const purchaseFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
})

export const HANDLERS = {
    [Types.PURCHASE_LIST_ACTION]: purchaseListAction,
    [Types.PURCHASE_LIST_SUCCESS]: purchaseListSuccess,
    [Types.PURCHASE_DETAIL_ACTION]: purchaseDetailAction,
    [Types.PURCHASE_DETAIL_SUCCESS]: purchaseDetailSuccess,
    [Types.PURCHASE_FAILURE]: purchaseFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);