import { call, put, takeLatest, fork, all, delay } from "redux-saga/effects";
import { FinanceService } from "../../service";
import {
  nameCar,
  sagaErrorHandler,
  sagaSuccessMessage,
  sagaWrapper,
  textEmpty,
} from "../../utils/common";
import RequestAction, { Types } from "./actions";

function* getRequestList() {
  yield takeLatest(
    Types.REQUEST_LIST_ACTION,
    sagaWrapper(function* (action) {
      const result = yield call(FinanceService.FINANCE_LIST, action.params);
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
        const dealer = item?.buyer?.email;
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
          dealerName,
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
        recordPerPage: result.data.metadata[0]?.recordPerPage || 10,
      };
      const newResult = Object.assign(result, { data, params });
      yield put(RequestAction.requestListSuccess(newResult));
    }, errorHandle(Types.REQUEST_FAILURE))
  );
}

// function* getPurchaseDetail() {
//   yield takeLatest(
//     Types.PURCHASE_DETAIL_ACTION,
//     sagaWrapper(function* (action) {
//       const result = yield call(PurchaseService.PURCHASE_DETAIL, action.purchaseCode);
//       yield put(RequestAction.purchaseDetailSuccess(result.data));
//     }, errorHandle(Types.PURCHASE_FAILURE))
//   );
// }

function errorHandle(errorActionType) {
  return sagaErrorHandler(function* (e, action) {
    console.warn("SAP SYSTEM ERROR:", e);
    yield put({ type: errorActionType, sessionId: action?.sessionId });
  });
}

export default function* rootSaga() {
  yield all([
    fork(getRequestList),
    // fork(getPurchaseDetail),
  ]);
}
