import React from 'react';
import {Route, IndexRoute} from 'react-router';

import * as actionCreators from './actions/actionCreators';

import {App} from './components/app';
import AllPolls from './containers/AllPolls';
import MyPolls from './components/MyPolls';

export const getRoutes = (store)=> {

  const getPolls = ()=> {
    store.dispatch(actionCreators.getAllPolls());
  };

  return(
    <Route path="/" component={App}>
      <IndexRoute 
      component={AllPolls} 
      onEnter={()=> {getPolls();}}/>
      <Route path="my-polls" component={MyPolls}/>
    </Route>
  );
};

