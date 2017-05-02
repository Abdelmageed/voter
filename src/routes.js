import React from 'react';
import {Route, IndexRoute} from 'react-router';

import * as actionCreators from './actions/actionCreators';

import {App} from './components/app';
import AllPolls from './containers/AllPolls';
import MyPolls from './containers/MyPolls';

export const getRoutes = (store)=> {

  const getPolls = ()=> {
    store.dispatch(actionCreators.getAllPolls());
  };

  const redirectIfNotAuth = (nextState, replace) => {
    //use our manually persisted sessionId in local storage as redux-persist store rehydration happens after page reload, we need it before that
    const sessionId =  localStorage.getItem('sessionId');
      if(!sessionId) {
        replace({
          pathname: '/'
        });
      }
  };

  return(
    <Route path="/" component={App}>
      <IndexRoute 
        component={AllPolls} 
        onEnter={()=> {getPolls();}}/>
      <Route 
        path="my-polls" 
        component={MyPolls}
        onEnter={redirectIfNotAuth}/>
    </Route>
  );
};

