import {initialState} from '../initialState';
import * as actions from '../constants/actions';

export function polls(state = initialState.polls, action){
  switch(action.type){
      
    case actions.ADD_POLL:
      return state.concat(action.poll);
    
    case actions.DELETE_POLL:
      return state.filter((poll)=> {(poll.id !== action.id);});
      
    case actions.SET_POLLS:
      return action.polls;
      
    default:
        return state;
  }
}