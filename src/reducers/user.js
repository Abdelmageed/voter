import {initialState} from '../initialState';
import {SET_USER} from '../actions/actions';

export function user(state = initialState.user, action){
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, action.user);
    default:
      return state;
  }
}