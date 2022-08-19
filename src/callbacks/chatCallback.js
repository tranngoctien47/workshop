import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import ChatAction from "../redux/chat/actions";

export const GetChatListCallback = () => {
  const dispatch = useDispatch();
  return useCallback(
    (params) => dispatch(ChatAction.chatListAction(params)),
    [dispatch]
  );
};

export const GetChatDetailCallback = () => {
  const dispatch = useDispatch();
  return useCallback(
    (chatCode) => dispatch(ChatAction.chatDetailAction(chatCode)),
    [dispatch]
  );
};

export const CreateChatCallback = () => {
  const dispatch = useDispatch();
  return useCallback(
    (params, callback, typeChat, optionChat) =>
      dispatch(
        ChatAction.chatCreateAction(params, callback, typeChat, optionChat)
      ),
    [dispatch]
  );
};

export const CreateChatSendMessageCallback = () => {
  const dispatch = useDispatch();
  return useCallback(
    (chatCode, params, callback) =>
      dispatch(ChatAction.chatSendMessageAction(chatCode, params, callback)),
    [dispatch]
  );
};
