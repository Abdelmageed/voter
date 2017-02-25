// Set up your application entry point here...
import configureStore from './store/configureStore';
import React from 'react';
import ReactDOM from 'react-dom';
import renderApp from './components/app';

const store = configureStore({});
const reactRoot = window.document.getElementById("app");
renderApp().then(appComponent=> {
  ReactDOM.render(appComponent, reactRoot);
});

export default store;