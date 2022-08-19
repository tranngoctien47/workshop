import {createReducer} from "reduxsauce";
import storage from "../../utils/localStorage";
import {Types} from "./actions";

const INITIAL_STATE = {
    isFetching: false,
    idToken: storage.getAccessToken()
};

export const signUpAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const signUpSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
})

export const signInAction = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: true,
})

export const signInSuccess = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
})

export const login = (state = INITIAL_STATE, action) => ({
    ...state,
    idToken: action.token,
})

export const logOut = (state = INITIAL_STATE, action) => ({
    ...state,
    idToken: null,
})

export const authorizationFailure = (state = INITIAL_STATE, action) => ({
    ...state,
    isFetching: false,
})

export const HANDLERS = {
    [Types.SIGN_UP_ACTION]: signUpAction,
    [Types.SIGN_UP_SUCCESS]: signUpSuccess,
    [Types.SIGN_IN_ACTION]: signInAction,
    [Types.SIGN_IN_SUCCESS]: signInSuccess,
    [Types.LOGIN]: login,
    [Types.LOG_OUT]: logOut,
    [Types.AUTHORIZATION_FAILURE]: authorizationFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);
