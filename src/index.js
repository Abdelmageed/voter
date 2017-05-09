import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import {Router, browserHistory} from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome-webpack';

import configureStore from './store/configureStore';
import {getRoutes} from './routes';
import {getIp} from './actions/actionCreators';
import session from './util/session';
import './index.css';

const store = configureStore();
persistStore(store, () => {
  if(!store.getState().user.isAuthenticated) {session.setSessionId('');}
});
store.dispatch(getIp());


const reactRoot = window.document.getElementById("app");
  ReactDOM.render(
    <Provider store={store}>
      <Router history={browserHistory}>
        {getRoutes()}
      </Router>
    </Provider>,
    reactRoot);
