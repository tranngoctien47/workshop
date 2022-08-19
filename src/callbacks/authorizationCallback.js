import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import AuthorizationAction from "../redux/authorization/actions";

export const SignUpCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (params, callback) =>
            dispatch(AuthorizationAction.signUpAction(params, callback)),
        [dispatch]
    );
};

export const SignInCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (params, callback) =>
            dispatch(AuthorizationAction.signInAction(params, callback)),
        [dispatch]
    );
};

export const LoginCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (token) =>
            dispatch(AuthorizationAction.login(token)),
        [dispatch]
    );
};

export const LogOutCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        () =>
            dispatch(AuthorizationAction.logOut()),
        [dispatch]
    );
};