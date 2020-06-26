import axios from 'axios';
import { put } from 'redux-saga/effects';

import { proxy } from '../../utils/proxy';
import * as actions from '../action/index';
import { getToken, setToken, removeToken } from '../../utils/localStorage';

/*
    Note: 
        ---> yield: yield work same as async await, but yield work only in function generator 
        ---> put: put is one example of what we call an Effect. Effects are plain JavaScript objects 
                which contain instructions to be fulfilled by the middleware. When a middleware retrieves 
                an Effect yielded by a Saga, the Saga is paused until the Effect is fulfilled.
*/

// Auth logout saga function generator
export function* authLogoutSaga() {
    // Remove token from localstorage
    yield removeToken();

    // Call logout successed to logout from application
    yield put(actions.logoutSuccessed());
};

// Auth login saga function generator
export function* authLoginSaga(action) {

    // Call auth start to showing loading spinner in webapp
    yield put(actions.authStart());

    try {
        // Call api to login user
        const res = yield axios.post(`${proxy}https://sahil-task-manager.herokuapp.com/users/login`, { 
            email: action.email, 
            password: action.password
        });
    
        // Set token into localstorage
        setToken(res.data.token);
    
        // Call authSuccess to store data in state
        yield put(actions.authSuccess(res.data.token, res.data.user));
        
    } catch (err) {
        console.log(err.message);

        // Call authFail to store error message in state
        yield put(actions.authFail(err.message));
    };
};

// Auth signup saga function generator
export function* authSignupSaga(action) {

    // Call auth start to showing loading spinner in webapp
    yield put(actions.authStart());

    try {
        // Call api to signup user
        const res = yield axios.post(`${proxy}http://sahil-task-manager.herokuapp.com/users`, { 
            name: action.name, 
            email: action.email, 
            password: action.password 
        });

        // Set token into localstorage
        setToken(res.data.token);

        // Call authSuccess to store data in state
        yield put(actions.authSuccess(res.data.token, res.data.user));

    } catch (err) {
        console.log(err.message);

        // Call authFail to store error message in state
        yield put(actions.authFail(err.message));
    }    
};

// Auth token saga function generator
export function* authTokenSaga() {
    let token = null;

    // Get token from localstorage
    token = getToken();
       
    if (token) {
        // Call auth start to showing loading spinner in webapp
        yield put(actions.authStart());
        
        try {
            // Get user data from database using token
            const res = yield axios.get(`${proxy}https://sahil-task-manager.herokuapp.com/users/me`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });

            // Call authSuccess to store data in state
            yield put(actions.checkAuthToken(token, res.data));

        } catch (err) {
            console.log(err.message);

            // Call authSuccess to store data in state
            yield put(actions.checkAuthToken(null, null));

            // Call authFail to store error message in state
            yield put(actions.authFail(err.message));
        };
    }
};