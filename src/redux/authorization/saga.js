import { call, put, takeLatest, fork, all, delay} from "redux-saga/effects";
import { AuthService } from "../../service";
import { sagaErrorHandler, sagaSuccessMessage, sagaWrapper } from "../../utils/common";
import AuthorizationAction, { Types } from "./actions";
import storage from "../../utils/localStorage"

function* signUp() {
    yield takeLatest(
        Types.SIGN_UP_ACTION,
        sagaWrapper(function* (action) {
            const result = yield call(AuthService.SIGN_UP, action.params);
            delay(1000);
            sagaSuccessMessage({
                action,
                successMessage: "Create account success",
                description: result?.data?.email
            });
            yield put(AuthorizationAction.signUpSuccess());
            action.callback && action.callback();
        }, errorHandle(Types.AUTHORIZATION_FAILURE))
    );
}

function* signIn() {
    yield takeLatest(
        Types.SIGN_IN_ACTION,
        sagaWrapper(function* (action) {
            const result = yield call(AuthService.SIGN_IN, action.params);
            delay(1000);
            sagaSuccessMessage({
                action,
                successMessage: "Login success",
                description: action.params.email
            });
            yield storage.setAccessToken(result?.data?.user?.token);
            yield storage.setEmailSigin(result?.data?.user?.email);
            yield put(AuthorizationAction.signUpSuccess());

            action.callback && action.callback(result.data.user.userRole || "dealer", result.data.user.merchantCode ,result.data.user.code);
        }, errorHandle(Types.AUTHORIZATION_FAILURE))
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
        fork(signUp),
        fork(signIn)
    ]);
}
