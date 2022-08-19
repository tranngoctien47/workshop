import { createReducer } from "reduxsauce";
import { PAGINATION, TYPE_USER } from "../../consts/Enum";
import { Types } from "./actions";

const INITIAL_STATE = {
  isFetching: false,
  userList: [],
  params: {
    page: PAGINATION.page,
    recordPerPage: PAGINATION.recordPerPage,
    userRole: TYPE_USER.BUYER,
  },
  userDetail: {},
};

export const userListAction = (state = INITIAL_STATE, action) => ({
  ...state,
  isFetching: true,
});

export const userListSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isFetching: false,
  params: { ...state.params, ...action.data.params },
  userList: action.data.data,
});

export const userDetilAction = (state = INITIAL_STATE, action) => ({
  ...state,
  isFetching: true,
});

export const userDetailSuccess = (state = INITIAL_STATE, action) => ({
  ...state,
  isFetching: false,
  userDetail: action.data,
});

export const userFailure = (state = INITIAL_STATE, action) => ({
  ...state,
  isFetching: false,
});

export const HANDLERS = {
  [Types.USER_LIST_ACTION]: userListAction,
  [Types.USER_LIST_SUCCESS]: userListSuccess,
  [Types.USER_DETAIL_ACTION]: userDetilAction,
  [Types.USER_DETAIL_SUCCESS]: userDetailSuccess,
  [Types.USER_FAILURE]: userFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
