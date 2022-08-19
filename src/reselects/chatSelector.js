import { createSelector } from "reselect";

const getChatState = (state) => state.chatState;

export const selectChatParams = () =>
  createSelector(getChatState, (chatState) => chatState.params);

export const selectChatList = () =>
  createSelector(getChatState, (chatState) => chatState.chatList);

export const selectChatDetail = () =>
  createSelector(getChatState, (chatState) => chatState.chatDetail);
