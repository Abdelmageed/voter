// Set up your application entry point here...
import configureStore from './store/configureStore';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './components/app';
import 'bootstrap/dist/css/bootstrap.css';

const store = configureStore();
const reactRoot = window.document.getElementById("app");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    reactRoot);
