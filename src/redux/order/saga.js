import { call, put, takeLatest, fork, all, delay } from "redux-saga/effects";
import { OrderService } from "../../service";
import {
  nameCar,
  sagaErrorHandler,
  sagaSuccessMessage,
  sagaWrapper,
  textEmpty,
} from "../../utils/common";
import OrderAction, { Types } from "./actions";

function* getOrderList() {
  yield takeLatest(
    Types.ORDER_LIST_ACTION,
    sagaWrapper(function* (action) {
      const result = yield call(OrderService.LIST_ORDER, action.params);
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
        recordPerPage: result.data.metadata[0]?.recordPerPage || 10,
      };
      const newResult = Object.assign(result, { data, params });
      yield put(OrderAction.orderListSuccess(newResult));
    }, errorHandle(Types.ORDER_FAILURE))
  );
}

function* getOrderDetailAdmin() {
  yield takeLatest(
    Types.ORDER_ADMIN_DETAIL_ACTION,
    sagaWrapper(function* (action) {
      const result = yield call(
        OrderService.ORDER_DETAIL_ADMIN,
        action.orderCode,
        action.typeOrder
      );
      yield put(OrderAction.orderAdminDetailSuccess(result.data));
    }, errorHandle(Types.ORDER_FAILURE))
  );
}

function* getOrderDetail() {
  yield takeLatest(
    Types.ORDER_DETAIL_ACTION,
    sagaWrapper(function* (action) {
      const result = yield call(OrderService.ORDER_DETAIL, action.orderCode);
      yield put(OrderAction.orderDetailSuccess(result.data));
    }, errorHandle(Types.ORDER_FAILURE))
  );
}

function* updateOrderStatus() {
  yield takeLatest(
    Types.ORDER_ADMIN_UPDATE_STATUS_ACTION,
    sagaWrapper(function* (action) {
      const res = yield call(OrderService.UPDATE_STATUS_ORDER_ADMIN, action.orderCode, action.typeOrder, action.params);
      yield put({ type: Types.ORDER_LIST_ACTION, params: action.paramsList });
      delay(1000);
      sagaSuccessMessage({
        action,
        successMessage: "Update success",
        description:"",
      });
      yield put(OrderAction.orderAdminUpdateStatusSuccess());
      // action.callback && action.callback();
    }, errorHandle(Types.ORDER_FAILURE))
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
    fork(getOrderList),
    fork(getOrderDetail),
    fork(getOrderDetailAdmin),
    fork(updateOrderStatus)
  ]);
}
