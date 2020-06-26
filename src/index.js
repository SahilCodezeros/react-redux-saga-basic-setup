// React imports
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Redux imports
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMeddleware from 'redux-saga';

// Local imports
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import authReducer from './store/reducer/auth';
import { watchAuth } from './store/sagas/index';

// For redux dev tool to see state
const composeEnhancer = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

// Root reducers
const rootReducer = combineReducers({
  auth: authReducer
});

// Saga middleware
const sagaMiddleware = createSagaMeddleware();

// Store
const store = createStore(rootReducer, composeEnhancer(
  applyMiddleware(thunk, sagaMiddleware)
));

// Run generator functions by sagaMiddleware
sagaMiddleware.run(watchAuth);

const app = (
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
