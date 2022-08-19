import { call, put, takeLatest, fork, all, delay } from "redux-saga/effects";
import Urls from "../../consts/Urls";
import { InventoryService, MarketplaceService, OrderService, PurchaseService } from "../../service";
import {
  sagaErrorHandler,
  sagaSuccessMessage,
  sagaWrapper,
} from "../../utils/common";
import MarketplaceAction, { Types } from "./actions";

function* getMarketplaceList() {
  yield takeLatest(
    Types.MARKETPLACE_LIST_ACTION,
    sagaWrapper(function* (action) {
      const result = yield call(
        MarketplaceService.LIST_MARKETPLACE,
        action.params
      );
      const data = result.data.map((item) => {
        const car = {
          thumb: item?.photos?.length
            ? Urls.URL_FILE + item?.photos[0]?.path?.origin
            : "",
          name:
            item.year +
            " " +
            item?.brand?.name +
            " " +
            item?.engine?.name +
            " " +
            item?.variant?.name +
            " " +
            item?.seatingCapacity?.name,
          des: item.vin,
        };
        const supplier = "";
        const price = item.sellingPrice;
        const id = item.code;
        const location = item?.location?.name;
        return { ...item, supplier, car, price, id, location };
      });
      const params = {
        page: result.pageCurrent || 1,
        recordTotal: result.recordTotal,
        pageTotal: (result.recordTotal / result.recordPerPage) * 10,
        recordPerPage: result.recordPerPage || 10,
      };
      const newResult = Object.assign(result, { data, params });
      yield put(MarketplaceAction.marketplaceListSuccess(newResult));
    }, errorHandle(Types.MARKETPLACE_FAILURE))
  );
}

function* getMarketplaceDetail() {
  yield takeLatest(
    Types.MARKETPLACE_DETAIL_ACTION,
    sagaWrapper(function* (action) {
      const result = yield call(InventoryService.DELETE_INVENTORY, action.code);
      yield put(MarketplaceAction.marketplaceDetailSuccess(result.data));
    }, errorHandle(Types.MARKETPLACE_FAILURE))
  );
}

function* updateMarketplaceBooking() {
  yield takeLatest(
    Types.MARKETPLACE_BOOKING_ACTION,
    sagaWrapper(function* (action) {
      yield put(MarketplaceAction.marketplaceBookingSuccess(action.params));
    }, errorHandle(Types.MARKETPLACE_FAILURE))
  );
}

function* createMarketplaceBooking() {
  yield takeLatest(
    Types.MARKETPLACE_BOOKING_CREATE_ACTION,
    sagaWrapper(function* (action) {
      const preOrderInfo = yield call(OrderService.PRE_ORDER_INFO, action.params.car.code);
      const paramsNew = {...action.params, preOrderInfo: preOrderInfo.data.preOrderInfo}
      const result = yield call(MarketplaceService.CREATE_MARKETPLACE_ORDER, paramsNew);
      const resultOrder = yield call(PurchaseService.PURCHASE_DETAIL, result.result.orderRecord.code);
      delay(1000);
      sagaSuccessMessage({
        action,
        successMessage: "Create order success",
        description: action.params.vin,
      });
      resultOrder.data.preOrderInfo = preOrderInfo.data.preOrderInfo
      yield put(MarketplaceAction.marketplaceBookingCreateSuccess(resultOrder));
      action.callback && action.callback();
    }, errorHandle(Types.MARKETPLACE_FAILURE))
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
    fork(getMarketplaceList),
    fork(getMarketplaceDetail),
    fork(updateMarketplaceBooking),
    fork(createMarketplaceBooking),
  ]);
}
