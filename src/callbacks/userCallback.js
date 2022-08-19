import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import UserAction from "../redux/user/actions";

export const GetUserListCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (params) =>
            dispatch(UserAction.userListAction(params)),
        [dispatch]
    );
};

export const GetUserDetailCallback = () => {
    const dispatch = useDispatch();
    return useCallback(
        (userCode) =>
            dispatch(UserAction.userDetailAction(userCode)),
        [dispatch]
    );
};