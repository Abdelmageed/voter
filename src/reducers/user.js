import {initialState} from '../initialState';
import * as actions from '../constants/actions';
import * as errors from '../constants/errors';

export function user(state = initialState.user, action){
  switch (action.type) {
      
    case actions.SET_USER:
      return Object.assign({}, state, action.user);
      
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        isAuthenticated: true,
        loggingIn: false,
        error: ''
      });
      
    case 'LOGIN_FAILURE':
      return Object.assign({}, state, {
        isAuthenticated: false,
        loggingIn: false,
        error: action.error
      });
      
    case 'LOGIN_PENDING':
      return Object.assign({}, state, {
        loggingIn: true
      });
      
    case 'SET_USERNAME_ERROR':
      return Object.assign({}, state, {
        signup: Object.assign({}, state.signup, {
          usernameError: errors.usernameInUse
        })
      });
      
    default:
      return state;
  }
}