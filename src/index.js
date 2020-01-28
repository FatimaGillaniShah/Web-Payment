import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import index from "./reducers/index";
import httpService from './Interceptors';


export const history = createBrowserHistory()
const store = createStore(index,applyMiddleware(logger,thunkMiddleware))
httpService.setupInterceptors(history);

const app = (
          <Provider store={store}>
                <Router history={history}>
                   <App />
                </Router>
          </Provider>
    
);
ReactDOM.render( app, document.getElementById('root'));

serviceWorker.unregister();
