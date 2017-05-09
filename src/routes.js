import React from 'react';
import {Route, IndexRoute} from 'react-router';

import {App} from './components/app';
import AllPolls from './containers/AllPolls';
import MyPolls from './containers/MyPolls';
import Poll from './containers/Poll';

export const getRoutes = () => {

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
        component={AllPolls} />
      <Route 
        path="/my-polls" 
        component={MyPolls}
        onEnter={redirectIfNotAuth}/>
      <Route
        path="/poll-detail/:_id"
        component={Poll}/>
      <Route
        path="*"
        component={() => ((<div>404</div>))} />
    </Route>
  );
};

