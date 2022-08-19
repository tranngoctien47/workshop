import { call, put, takeLatest, fork, all, delay } from "redux-saga/effects";
import { CAR_USAGE_TYPE, TYPE_FILE } from "../../consts/Enum";
import { InventoryService } from "../../service";
import {
  parseListStatusCar,
  promiseUpload,
  sagaErrorHandler,
  sagaSuccessMessage,
  sagaWrapper,
} from "../../utils/common";
import InventoryAction, { Types } from "./actions";

function* getInventoryList() {
  yield takeLatest(
    Types.INVENTORY_LIST_ACTION,
    sagaWrapper(function* (action) {
      const result = yield call(InventoryService.LIST_INVENTORY, action.params);
      const data = result.data.map((item) => {
        const type = CAR_USAGE_TYPE[item.usageType];
        const brand = item.brand.name;
        const model = item.model.name;
        const variant = item.variant?.name;
        const color = [item?.color, item?.secondaryColor];
        const price = item.sellingPrice;
        const id = item.code;
        const media = {
          image: item?.photos?.length || 0,
          video: 0,
        };
        return {
          ...item,
          type,
          brand,
          model,
          variant,
          color,
          price,
          id,
          media,
        };
      });
      const params = {
        page: result.pageCurrent || 1,
        recordTotal: result.recordTotal,
        pageTotal: (result.recordTotal / result.recordPerPage) * 10,
        recordPerPage: result.recordPerPage || 10,
      };
      const newResult = Object.assign(result, { data, params });
      yield put(InventoryAction.inventoryListSuccess(newResult));
    }, errorHandle(Types.INVENTORY_FAILURE))
  );
}

function* getInventoryDetail() {
  yield takeLatest(
    Types.INVENTORY_DETAIL_ACTION,
    sagaWrapper(function* (action) {
      const result = yield call(InventoryService.DETAIL_INVENTORY, action.code);
      yield put(InventoryAction.inventoryDetailSuccess(result.data));
    }, errorHandle(Types.INVENTORY_FAILURE))
  );
}

function* getInventoryCountStatus() {
  yield takeLatest(
    Types.INVENTORY_COUNT_STATUS_ACTION,
    sagaWrapper(function* () {
      const result = yield call(InventoryService.COUNT_STATUS_INVENTORY);
      yield put(
        InventoryAction.inventoryCountStatusSuccess(
          parseListStatusCar(result.data)
        )
      );
    }, errorHandle(Types.INVENTORY_FAILURE))
  );
}

function* deleteInventory() {
  yield takeLatest(
    Types.INVENTORY_DELETE_ACTION,
    sagaWrapper(function* (action) {
      yield call(InventoryService.DELETE_INVENTORY, action.code);
      if (action.params) {
        yield put({ type: Types.INVENTORY_LIST_ACTION, params: action.params });
        yield put({ type: Types.INVENTORY_COUNT_STATUS_ACTION });
      }
      delay(1000);
      sagaSuccessMessage({
        action,
        successMessage: "Delete success",
        description: action.code,
      });
      yield put(InventoryAction.inventoryDeleteSuccess());
      action.callback && action.callback();
    }, errorHandle(Types.INVENTORY_FAILURE))
  );
}

function* createInventory() {
  yield takeLatest(
    Types.INVENTORY_CREATE_ACTION,
    sagaWrapper(function* (action) {
      const oldPhotos = action.params.photos;
      delete action.params.photos
      const res = yield call(InventoryService.CREATE_INVENTORY, action.params);
      if (oldPhotos?.length > 0) {
        yield promiseUpload(
          res.data.code,
          TYPE_FILE.CAR,
          oldPhotos
        );
      }
      delay(1000);
      sagaSuccessMessage({
        action,
        successMessage: "Create success",
        description: res.data.vin,
      });
      yield put(InventoryAction.inventoryCreateSuccess());
      action.callback && action.callback();
    }, errorHandle(Types.INVENTORY_FAILURE))
  );
}

function* updateInventory() {
  yield takeLatest(
    Types.INVENTORY_UPDATE_ACTION,
    sagaWrapper(function* (action) {
      const images = action.params.photos;
      if (images && images.length) {
        const imagesLocal = images.filter((el) => el.originFileObj);
        if (imagesLocal && imagesLocal.length) {
          yield promiseUpload(action.code, TYPE_FILE.CAR, imagesLocal);
          delete action.params.photos
        }
      }
      delete action.params.photos
      yield call(InventoryService.UPDATE_INVENTORY, action.params, action.code);
      delay(1000);
      sagaSuccessMessage({
        action,
        successMessage: "Update success",
        description: action.params.vin,
      });
      yield put(InventoryAction.inventoryUpdateSuccess());
      action.callback && action.callback();
    }, errorHandle(Types.INVENTORY_FAILURE))
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
    fork(getInventoryList),
    fork(getInventoryDetail),
    fork(getInventoryCountStatus),
    fork(createInventory),
    fork(deleteInventory),
    fork(updateInventory),
  ]);
}
