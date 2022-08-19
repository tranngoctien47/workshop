import { call, put, takeLatest, fork, all, delay } from "redux-saga/effects";
import { MerchantService } from "../../service";
import {
  parseDateColumnTable,
  sagaErrorHandler,
  sagaSuccessMessage,
  sagaWrapper,
  statusDeadler,
} from "../../utils/common";
import MerchantAction, { Types } from "./actions";
import { listStatusUser } from "../../page/Admin/User/UserList/data";

function* getMerchantList() {
  yield takeLatest(
    Types.MERCHANT_LIST_ACTION,
    sagaWrapper(function* (action) {
      const result = yield call(MerchantService.LIST_MERCHANT, action.params);
      const data = (result.data || []).map((item) => {
        const dealerName = {
          email: item.createBy.email,
          avatar: item.createBy.avatar,
          name: item.createBy.name,
        };
        const dateRegistered = parseDateColumnTable(item.submitted);
        const companyName = item?.merchant?.contactName || item?.contactName;
        const lastVisited = "-";
        const status = statusDeadler(item);
        const inventory = item.carInventory;
        const totalIncome = "";
        const totalCharged = "";
        const id = item.createBy.code;
        const merchantCode = item.code;
        return {
          ...item,
          dealerName,
          companyName,
          dateRegistered,
          lastVisited,
          status,
          totalIncome,
          inventory,
          totalCharged,
          id,
          merchantCode
        };
      });
      const newResult = Object.assign(result, { data: data });
      yield put(MerchantAction.merchantListSuccess(newResult));
    }, errorHandle(Types.MERCHANT_FAILURE))
  );
}

function* createMerchant() {
  yield takeLatest(
    Types.MERCHANT_CREATE_ACTION,
    sagaWrapper(function* (action) {
      const result = yield call(MerchantService.CREATE_MERCHANT, action.params);
      delay(1000);
      sagaSuccessMessage({
        action,
        successMessage: "Create merchant success",
        description: action?.params?.contactName,
      });
      localStorage.setItem("id_store",result.data.code)
      yield put(MerchantAction.merchantCreateSuccess());
      action.callback && action.callback();
    }, errorHandle(Types.MERCHANT_FAILURE))
  );
}

function* getMerchantDetail() {
  yield takeLatest(
    Types.MERCHANT_DETAIL_ACTION,
    sagaWrapper(function* (action) {
      const result = yield call(MerchantService.DETAIL_MERCHANT, action.merchantCode);
      yield put(MerchantAction.merchantDetailSuccess(result.result));
    }, errorHandle(Types.MERCHANT_FAILURE))
  );
}

function* updateStatusMerchant() {
  yield takeLatest(
    Types.MERCHANT_UPDATE_STATUS_ACTION,
    sagaWrapper(function* (action) {
      yield call(MerchantService.UPDATE_STATUS_MERCHANT, action.data, action.codeMerchant);
      delay(1000);
      sagaSuccessMessage({
        action,
        successMessage: "Update merchant success",
        description: action?.codeMerchant,
      });
      yield put(MerchantAction.merchantUpdateStatusSuccess());
      action.callback && action.callback();
    }, errorHandle(Types.MERCHANT_FAILURE))
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
    fork(createMerchant),
    fork(getMerchantList),
    fork(getMerchantDetail),
    fork(updateStatusMerchant)
  ]);
}
