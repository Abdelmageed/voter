// Set up your application entry point here...
import configureStore from './store/configureStore';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { App } from './components/app';
import 'bootstrap/dist/css/bootstrap.css';

const store = configureStore();
persistStore(store);
const reactRoot = window.document.getElementById("app");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    reactRoot);
