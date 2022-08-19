import { call, put, takeLatest, fork, all, delay } from "redux-saga/effects";
import { ChatService } from "../../service";
import {
  compare,
  sagaErrorHandler,
  sagaSuccessMessage,
  sagaWrapper
} from "../../utils/common";
import ChatAction, { Types } from "./actions";

function* getChatList() {
  yield takeLatest(
    Types.CHAT_LIST_ACTION,
    sagaWrapper(function* (action) {
      const result = yield call(ChatService.CHAT_LIST, action.params);
      const params = {
        page: result?.metadata?.pageCurrent || 1,
        recordTotal: result?.metadata?.recordTotal
      };
      const newResult = Object.assign(result, {
        params,
        data: result.data.data
      });
      yield put(ChatAction.chatListSuccess(newResult));
    }, errorHandle(Types.CHAT_FAILURE))
  );
}

function* getChatDetail() {
  yield takeLatest(
    Types.CHAT_DETAIL_ACTION,
    sagaWrapper(function* (action) {
      const result = yield call(ChatService.CHAT_DETAIL, action.chatCode);
      const newData = (result?.data?.data || []).sort(compare);
      yield put(ChatAction.chatDetailSuccess({ data: newData }));
    }, errorHandle(Types.CHAT_FAILURE))
  );
}

function* createChat() {
  yield takeLatest(
    Types.CHAT_CREATE_ACTION,
    sagaWrapper(function* (action) {
      const result = yield call(
        ChatService.CHAT_CREATE,
        action.params,
        action.typeChat,
        action.optionChat
      );
      yield put(ChatAction.chatCreateSuccess());
      action.callback && action.callback(result.data);
    }, errorHandle(Types.CHAT_FAILURE))
  );
}

function* createChatSendMessage() {
  yield takeLatest(
    Types.CHAT_SEND_MESSAGE_ACTION,
    sagaWrapper(function* (action) {
      yield call(ChatService.SEND_MESSAGE, action.chatCode, action.params);
      yield put({ type: Types.CHAT_DETAIL_ACTION, chatCode: action.chatCode });
      yield put(ChatAction.chatSendMessageSuccess());
      action.callback && action.callback();
    }, errorHandle(Types.CHAT_FAILURE))
  );
}

function errorHandle(errorActionType) {
  return sagaErrorHandler(function* (e, action) {
    console.warn("SAP SYSTEM ERROR:", e);
    yield put({ type: errorActionType, sessionId: action?.sessionId });
  });
}

export default function* rootSaga() {
  yield all([
    fork(getChatList),
    fork(getChatDetail),
    fork(createChat),
    fork(createChatSendMessage)
  ]);
}
