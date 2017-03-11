// Set up your root reducer here...
import { combineReducers } from 'redux';
import {user} from './user';
import {polls} from './polls';

 export default combineReducers({
   user,
   polls
 });

