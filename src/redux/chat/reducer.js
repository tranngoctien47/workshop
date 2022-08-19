import {createReducer} from "reduxsauce";
import {Types} from "./actions";
import { PAGINATION } from "./../../consts/Enum"

const INITIAL_STATE = {
    isFetching: false,
    isFetchingDetail : false,
    isFetchingSendMessage: false,
    chatList: [],
    params: {
        page: PAGINATION.page,
        recordPerPage: PAGINATION.recordPerPage,
    },
    chatDetail: []
};

export const chatListAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const chatListSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
    params: {...state.params,...action.data.params},
    chatList: action.data.data,
})

export const chatDetailAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetchingDetail: true,
})

export const chatDetailSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetchingDetail: false,
    chatDetail: action.data.data,
})

export const chatCreateAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const chatCreateSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
})

export const chatSendMessageAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetchingSendMessage: true,
})

export const chatSendMessageSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetchingSendMessage: false,
})

export const chatFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
    isFetchingSendMessage: false
})

export const HANDLERS = {
    [Types.CHAT_LIST_ACTION]: chatListAction,
    [Types.CHAT_LIST_SUCCESS]: chatListSuccess,
    [Types.CHAT_DETAIL_ACTION]: chatDetailAction,
    [Types.CHAT_DETAIL_SUCCESS]: chatDetailSuccess,
    [Types.CHAT_CREATE_ACTION]: chatCreateAction,
    [Types.CHAT_CREATE_SUCCESS]: chatCreateSuccess,
    [Types.CHAT_FAILURE]: chatFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);