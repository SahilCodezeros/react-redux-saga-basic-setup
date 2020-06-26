import * as actionTypes from '../action/actionTypes';
import { updateObject } from '../../shared/utility';

// Initial state
const initState = {
    token: null,
    user: null,
    error: null,
    loading: null,
    redirectPath: '/'
};

// Auth Start fucntion for update state
const authStart = (state, action) => {

    // Use updateObject function to update state
    return updateObject(state, { error: null, loading: true });
};

// Auth Fail fucntion for update state
const authFail = (state, action) => {

    // Use updateObject function to update state
    return updateObject(state, { error: action.error, loading: null });
};

// Auth Success fucntion for update state
const authSuccess = (state, action) => {

    // Use updateObject function to update state
    return updateObject(state, {
        ...state,
        error: null,
        loading: null,
        token: action.token,
        user: action.user
    });
};

// Auth logout fucntion for update state
const authLogout = (state, action) => {

    // Use updateObject function to update state
    return updateObject(state, { token: null, user: null });
};

// Check auth token function to update state
const checkAuthToken = (state, action) => {

    // Use updateObject function to update state
    return updateObject(state, { token: action.token, user: action.user, loading: null });
};

// Reducer function
const reducer = (state = initState, action) => {
    switch (action.type) {

        case actionTypes.AUTH_START:
            return authStart(state, action);

        case actionTypes.AUTH_FAIL:
            return authFail(state, action);

        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);

        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);

        case actionTypes.CHECK_AUTH_TOKEN:
            return checkAuthToken(state, action);
        
        default:
            return state;
    }
};

export default reducer;