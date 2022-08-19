import {createReducer} from "reduxsauce";
import {Types} from "./actions";
import { PAGINATION } from "./../../consts/Enum"

const INITIAL_STATE = {
    isFetching: false,
    isFetchingCountStatus: false,
    listStatus: [],
    inventoryList: [],
    params: {
        page: PAGINATION.page,
        recordPerPage: PAGINATION.recordPerPage,
        all: false,
    },
    inventoryDetail: {}
};

export const inventoryListAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const inventoryListSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
    params: {...state.params,...action.data.params},
    inventoryList: action.data.data,
})

export const inventoryDetailAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const inventoryDetailSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
    inventoryDetail: action.data
})

export const inventoryCountStatusAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetchingCountStatus: true,
})

export const inventoryCountStatusSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetchingCountStatus: false,
    listStatus: action.data
})

export const inventoryDeleteAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const inventoryDeleteSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
})

export const inventoryCreateAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const inventoryCreateSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
})

export const inventoryUpdateAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const inventoryUpdateSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
})

export const inventoryFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
    isFetchingCountStatus: false
})

export const HANDLERS = {
    [Types.INVENTORY_LIST_ACTION]: inventoryListAction,
    [Types.INVENTORY_LIST_SUCCESS]: inventoryListSuccess,
    [Types.INVENTORY_DETAIL_ACTION]: inventoryDetailAction,
    [Types.INVENTORY_DETAIL_SUCCESS]: inventoryDetailSuccess,
    [Types.INVENTORY_COUNT_STATUS_ACTION]: inventoryCountStatusAction,
    [Types.INVENTORY_COUNT_STATUS_SUCCESS]: inventoryCountStatusSuccess,
    [Types.INVENTORY_DELETE_ACTION]: inventoryDeleteAction,
    [Types.INVENTORY_DELETE_SUCCESS]: inventoryDeleteSuccess,
    [Types.INVENTORY_CREATE_ACTION]: inventoryCreateAction,
    [Types.INVENTORY_CREATE_SUCCESS]: inventoryCreateSuccess,
    [Types.INVENTORY_UPDATE_ACTION]: inventoryUpdateAction,
    [Types.INVENTORY_UPDATE_SUCCESS]: inventoryUpdateSuccess,
    [Types.INVENTORY_FAILURE]: inventoryFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);