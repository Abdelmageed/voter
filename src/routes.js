import React from 'react';
import {Route, IndexRoute} from 'react-router';

import {App} from './components/app';
import AllPolls from './components/AllPolls';
import MyPolls from './components/MyPolls';

export default(
  <Route path="/" component={App}>
    <IndexRoute component={AllPolls}/>
    <Route path="my-polls" component={MyPolls}/>
  </Route>
);