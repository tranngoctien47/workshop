import { all } from "redux-saga/effects";
import authSagas from "@iso/redux/auth/saga";
import inventorySagas from "./inventory/saga";
import authorizationSagas from "./authorization/saga";
import merchantSagas from "./merchant/saga";
import userSagas from "./user/saga";
import orderSagas from "./order/saga";
import marketplaceSagas from "./marketplace/saga";
import chatSagas from "./chat/saga";
import purchaseSagas from "./purchase/saga";
import requestSagas from "./request/saga";

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    inventorySagas(),
    authorizationSagas(),
    merchantSagas(),
    userSagas(),
    orderSagas(),
    marketplaceSagas(),
    chatSagas(),
    purchaseSagas(),
    requestSagas()
  ]);
}
