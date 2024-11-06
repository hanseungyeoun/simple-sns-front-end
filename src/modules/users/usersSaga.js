import { call, takeLatest, put, all, fork, select, delay } from "redux-saga/effects";
import { usersAction } from './usersSlice';
import * as usersApi from '../../api/users';

function* login(action) {
    const { loginSuccess, loginError } = usersAction;
    try {
        const payload = yield call(usersApi.login, action.payload);
        console.log(payload)
        yield put(loginSuccess({ data: payload.data.data }))
    } catch (error) {
        yield put(loginError({
            error
        }))
    }
}
function* setIsLogin(action) {
    const user = yield select(state => state.users.user);
    if (user.data) yield put(usersAction.setIsLogin(true))
    else yield put(usersAction.setIsLogin(false))
}

function* getUserDetails(action) {
    const { getUserDetailsSuccess, getUserDetailsError } = usersAction;
    try {
        const payload = yield call(usersApi.getUserDetails);
        console.log(payload)
        yield put(getUserDetailsSuccess({ data: payload.data.data }))
    } catch (error) {
        yield put(getUserDetailsError({
            error
        }))
    }
}

function* watchLogin() {
    yield takeLatest(usersAction.login, login);
}

function* watchLoginSuccess() {
    yield takeLatest(usersAction.loginSuccess, setIsLogin);
}

function* watchUserDetails() {
    yield takeLatest(usersAction.getUserDetails, getUserDetails);
}

export function* usersSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLoginSuccess),
        fork(watchUserDetails)
    ])
} 