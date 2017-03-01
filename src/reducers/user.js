import {initialState} from '../initialState';
import * as actions from '../constants/actions';

export function user(state = initialState.user, action){
  switch (action.type) {
    case actions.SET_USER:
      return Object.assign({}, state, action.user);
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        isAuthenticated: true,
        loggingIn: false});
    case 'LOGIN_FAILURE':
      return Object.assign({}, state, {
        isAuthenticated: false,
        loggingIn: false});
    default:
      return state;
  }
}