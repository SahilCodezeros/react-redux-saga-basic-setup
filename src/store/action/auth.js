import * as actionTypes from './actionTypes';

// Auth Start use for loading spinner while data is in transfer mode
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

// Auth Success use for storing token and userid after success request
export const authSuccess = (token, user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        user
    }
};

// Auth Fail use when request fail
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
};

// Send auth token and user data to reducer
export const checkAuthToken = (token, user) => {
    return {
        type: actionTypes.CHECK_AUTH_TOKEN,
        token,
        user
    };
};

// Check for token in localstorage and if token present then fetch user data
export const authToken = () => {
    return {
        type: actionTypes.AUTH_TOKEN
    };
};

// Logout user from appliction
export const logoutAuth = () => {
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const logoutSuccessed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

// Auth login action
export const loginAuth = (email, password) => {
    return {
        type: actionTypes.AUTH_USER_LOGIN,
        email,
        password
    }
};

// Auth signup action
export const signupAuth = (name, email, password) => {
    return {
        type: actionTypes.AUTH_USER_SIGNUP,
        name,
        email,
        password
    };
};