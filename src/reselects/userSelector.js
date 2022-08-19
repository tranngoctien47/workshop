import { createSelector } from "reselect";

const getUserState = (state) => state.userState;

export const selectUserParams = () =>
  createSelector(getUserState, (userState) => userState.params);

export const selectUserList = () =>
  createSelector(getUserState, (userState) => userState.userList);

export const selectUserDeatail = () =>
  createSelector(getUserState, (userState) => userState.userDetail);
