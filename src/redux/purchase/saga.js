import { call, put, takeLatest, fork, all, delay } from "redux-saga/effects";
import { PurchaseService } from "../../service";
import {
  nameCar,
  sagaErrorHandler,
  sagaSuccessMessage,
  sagaWrapper,
  textEmpty
} from "../../utils/common";
import PurchaseAction, { Types } from "./actions";

function* getPurchaseList() {
  yield takeLatest(
    Types.PURCHASE_LIST_ACTION,
    sagaWrapper(function* (action) {
      const result = yield call(PurchaseService.LIST_PURCHASE, action.params);
      const data = result.data.data.map((item) => {
        const order = item.code;
        const status = item.status || "pendingPayment";
        const product = nameCar(item?.car);
        const company = item?.merchant;
        const buyer = item?.buyer?.email;
        const date = item.created;
        const totalAmount = item?.car?.sellingPrice;
        const totalFee = item.shipfee || 0;
        const id = item.code;
        const dealer = item?.merchant;
        const dealerName = item?.merchant;
        return {
          ...item,
          order,
          status,
          product,
          buyer,
          date,
          id,
          totalAmount,
          totalFee,
          dealer,
          company,
          dealerName
        };
      });
      const params = {
        page: result.data?.metadata[0]?.pageCurrent || 1,
        recordTotal: result?.data.metadata[0]?.recordTotal || 10,
        pageTotal:
          (result.data.metadata[0]?.recordTotal /
            result.data.metadata[0]?.recordPerPage) *
            10 || 1,
        status: action.params.status || "all",
        recordPerPage: result.data.metadata[0]?.recordPerPage || 10
      };
      const newResult = Object.assign(result, { data, params });
      yield put(PurchaseAction.purchaseListSuccess(newResult));
    }, errorHandle(Types.PURCHASE_FAILURE))
  );
}

function* getPurchaseDetail() {
  yield takeLatest(
    Types.PURCHASE_DETAIL_ACTION,
    sagaWrapper(function* (action) {
      const result = yield call(
        PurchaseService.PURCHASE_DETAIL,
        action.purchaseCode
      );
      yield put(PurchaseAction.purchaseDetailSuccess(result.data));
    }, errorHandle(Types.PURCHASE_FAILURE))
  );
}

function errorHandle(errorActionType) {
  return sagaErrorHandler(function* (e, action) {
    console.warn("SAP SYSTEM ERROR:", e);
    yield put({ type: errorActionType, sessionId: action?.sessionId });
  });
}

export default function* rootSaga() {
  yield all([fork(getPurchaseList), fork(getPurchaseDetail)]);
}
