import {initialState} from '../initialState';
import * as actions from '../constants/actions';

function getItemsWithEditedPoll (items, action) {
  return items.map((poll) => {
        if (poll._id === action._id) {
          return {...poll, ...action.newPoll};
        }
        return poll;
      });
}

export function polls(state = initialState.polls, action){
  switch(action.type){
      
    case actions.ADD_POLL:
      return Object.assign({}, state, {items: state.items.concat(action.poll)});
    
    case actions.DELETE_POLL:
      return Object.assign({}, state, {items: state.items.filter((poll)=> {return (poll._id !== action._id);})});
      
    case actions.SET_POLLS:
      return Object.assign({}, state, {items: action.polls});

    case actions.EDIT_POLL:
      return Object.assign({}, state, {items: getItemsWithEditedPoll(state.items, action)});
      
    case actions.GET_REQUEST_PENDING:
      return Object.assign({}, state, {status: 'loading'});

    default:
        return state;
  }
}