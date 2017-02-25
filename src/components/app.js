import React from 'react';
import {Provider} from 'react-redux';
import {configure as authConfigure} from 'redux-auth';
import {AuthGlobals} from 'redux-auth/default-theme';
import store from '../index';

class App extends React.Component {
  render() {
    <div>
      <AuthGlobals />
      {this.props.children}
    </div>
  }
}

export function renderApp({cookies, isServer, currentLocation} = {}) {
  //configure redux-auth before rendering
  store.dispatch(authConfigure({
    apiUrl: 'localhost:3000'
  }, {
    isServer, cookies, currentLocation
  })).then(({redirectPath, blank} = {})=> {
    if (blank)
      return <noscript />
    else {
      return (<Provider store={store} key="provider">
        <App />
      </Provider>);
    }
  });
}