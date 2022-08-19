import {createReducer} from "reduxsauce";
import {Types} from "./actions";
import { PAGINATION } from "./../../consts/Enum"

const INITIAL_STATE = {
    isFetching: false,
    requestList: [],
    params: {
        page: PAGINATION.page,
        recordPerPage: PAGINATION.recordPerPage,
    },
    requestDetail: {}
};

export const requestListAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const requestListSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
    params: {...state.params,...action.data.params},
    requestList: action.data.data,
})

export const requestDetailAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const requestDetailSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
    requestDetail: action.data,
})

export const requestFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
})

export const HANDLERS = {
    [Types.REQUEST_LIST_ACTION]: requestListAction,
    [Types.REQUEST_LIST_SUCCESS]: requestListSuccess,
    [Types.REQUEST_DETAIL_ACTION]: requestDetailAction,
    [Types.REQUEST_DETAIL_SUCCESS]: requestDetailSuccess,
    [Types.REQUEST_FAILURE]: requestFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);