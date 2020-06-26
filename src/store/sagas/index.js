import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../action/actionTypes';
import { authLogoutSaga, authLoginSaga, authSignupSaga, authTokenSaga } from './auth';

// This function take apropriate action types and call respected function
export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, authLogoutSaga);
    yield takeEvery(actionTypes.AUTH_USER_LOGIN, authLoginSaga);
    yield takeEvery(actionTypes.AUTH_USER_SIGNUP, authSignupSaga);
    yield takeEvery(actionTypes.AUTH_TOKEN, authTokenSaga);
};