import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.css";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './store/reducer'
import { BrowserRouter as Router} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
export const history = createHistory()

const store = createStore(reducer)
const app = (
          <Provider store={store}>
                <Router history={history}>
                   <App />
                </Router>
          </Provider>
    
);
ReactDOM.render( app, document.getElementById('root'));

serviceWorker.unregister();
