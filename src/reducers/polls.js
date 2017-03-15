import {initialState} from '../initialState';
import * as actions from '../constants/actions';

export function polls(state = initialState.polls, action){
  switch(action.type){
    case actions.ADD_POLL:
      return state.concat(action.poll);
    default:
        return state;
  }
}