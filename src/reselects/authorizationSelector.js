import { createSelector } from "reselect";

const getAuthorizationState = (state) => state.authorizationState;

export const selectAuthorizationToken = () =>
    createSelector(getAuthorizationState, (authorizationState) => authorizationState.idToken);
