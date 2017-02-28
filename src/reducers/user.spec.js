import {Map} from 'immutable';
import {expect} from 'chai';
import {user} from './user';
import {initialState} from '../initialState';
import {SET_USER} from '../actions/actions';
//console.log(initialState.user);
describe('User Reducer', ()=> {
  
  it('should return the initial state on unknown actions', ()=> {
    const action = 'unknown';
    expect(user(initialState.user, action)).to.deep.equal(initialState.user);
  });
  
  it('should return the initial state if passed undefined', ()=> {
    const action = 'unkown';
    expect(user(undefined, action)).to.deep.equal(initialState.user);
  });
  
  it('should handle SET_USER', ()=> {
    const action = {
      type: SET_USER,
      user: {
        id: '123',
        username: 'John Doe'
      }
    },
          state = initialState.user,
          nextState = Object.assign({}, state, action.user);
    
    expect(user(state, action)).to.deep.equal(nextState);
  });
  
  
});