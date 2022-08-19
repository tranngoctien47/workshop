import {createReducer} from "reduxsauce";
import {Types} from "./actions";
import { FINANCE_OPTIONS, PAGINATION, SHIPPING_METHOD } from "./../../consts/Enum"

const INITIAL_STATE = {
    isFetching: false,
    marketplaceList: [],
    params: {
        page: PAGINATION.page,
        recordPerPage: PAGINATION.recordPerPage,
        all: false,
    },
    marketplaceDetail: {},
    marketBooking: {
        step: 0,
        shippingMethod: SHIPPING_METHOD.LOCAL_DELIVERY,
        financeOptions: FINANCE_OPTIONS.PAY_IN_FULL,
        mediaConact: []
    },
    infoOrder: {}
};

export const marketplaceListAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const marketplaceListSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
    params: {...state.params,...action.data.params},
    marketplaceList: action.data.data,
})

export const marketplaceDetailAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const marketplaceDetailSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
    marketplaceDetail: action.data
})

export const marketplaceBookingAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
})

export const marketplaceBookingSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    marketBooking: {...state.marketBooking, ...action.data},
})

export const marketplaceBookingCreateAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const marketplaceBookingCreateSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
    infoOrder: action.data.data
})

export const marketplaceFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
})

export const HANDLERS = {
    [Types.MARKETPLACE_LIST_ACTION]: marketplaceListAction,
    [Types.MARKETPLACE_LIST_SUCCESS]: marketplaceListSuccess,
    [Types.MARKETPLACE_DETAIL_ACTION]: marketplaceDetailAction,
    [Types.MARKETPLACE_DETAIL_SUCCESS]: marketplaceDetailSuccess,
    [Types.MARKETPLACE_BOOKING_ACTION]: marketplaceBookingAction,
    [Types.MARKETPLACE_BOOKING_SUCCESS]: marketplaceBookingSuccess,
    [Types.MARKETPLACE_BOOKING_CREATE_ACTION]: marketplaceBookingCreateAction,
    [Types.MARKETPLACE_BOOKING_CREATE_SUCCESS]: marketplaceBookingCreateSuccess,
    [Types.MARKETPLACE_FAILURE]: marketplaceFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);