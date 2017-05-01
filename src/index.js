import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import {Router, browserHistory} from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';

import configureStore from './store/configureStore';
import {getRoutes} from './routes';
import {getIp, getAllPolls} from './actions/actionCreators';
import session from './util/session';
require("font-awesome-webpack");

const store = configureStore();
persistStore(store);
store.dispatch(getIp());
store.dispatch(getAllPolls());
if(!store.getState().user.isAuthenticated) {session.setSessionId('');}

const reactRoot = window.document.getElementById("app");
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        {getRoutes(store)}
      </Router>
    </Provider>,
    reactRoot);
