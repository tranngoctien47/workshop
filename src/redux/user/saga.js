import { call, put, takeLatest, fork, all, delay} from "redux-saga/effects";
import { listStatusUser } from "../../page/Admin/User/UserList/data";
import { UserService } from "../../service";
import { parseDateColumnTable, sagaErrorHandler, sagaSuccessMessage, sagaWrapper, statusDeadler } from "../../utils/common";
import UserAction, { Types } from "./actions";
import { random } from "lodash";

function* getUserList() {
    yield takeLatest(
        Types.USER_LIST_ACTION,
        sagaWrapper(function* (action) {
            const result = yield call(UserService.LIST_USER_ADIM, action.params);
            const data = result.data.data.map((item) => {
                const dealerName = {
                    email: item?.email,
                    avatar: item?.avatar,
                    name: item?.fullname
                }
                const buyers = {
                    email: item?.email,
                    avatar: item?.avatar,
                    name: item?.fullname
                }
                const companyName = item?.merchant?.contactName || item?.contactName;
                const dateRegistered = parseDateColumnTable(item?.merchant?.created || item?.createdAt);
                const lastVisited = "-";
                const status = statusDeadler(item.merchant);
                const inventory = item.carInventory;
                const totalIncome = "";
                const totalCharged = "";
                const id = item.code;
                return { ...item, buyers, companyName, dealerName, dateRegistered, lastVisited, status, totalIncome, inventory, totalCharged, id };
            });
            
            const params = {
                page: result.data?.metadata[0]?.pageCurrent || 1,
                recordTotal: result?.data.metadata[0]?.recordTotal || 10,
                pageTotal: ((result.data.metadata[0]?.recordTotal / result.data.metadata[0]?.recordPerPage) * 10) || 1,
                recordPerPage: result.data.metadata[0]?.recordPerPage || 10,
                filter: {
                    ...action.params.filter
                }
            };
            const newResult = Object.assign(result, { data, params });
            yield put(UserAction.userListSuccess(newResult));
        }, errorHandle(Types.USER_FAILURE))
    );
}

function* getUserDetail() {
    yield takeLatest(
      Types.USER_DETAIL_ACTION,
      sagaWrapper(function* (action) {
        const result = yield call(UserService.DETAIL_USER, action.userCode);
        result.result.user.fullName = result?.result?.user?.name ? result?.result?.user?.firstName + " " + result?.result?.user?.lastName + " " + result?.result?.user?.name : "";
        yield put(UserAction.userDetailSuccess(result.result.user));
      }, errorHandle(Types.USER_FAILURE))
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
        fork(getUserList),
        fork(getUserDetail)
    ]);
}