import {expect} from 'chai';
import * as actions from '../constants/actions';
import {polls} from './polls';

describe('Polls Reducer', ()=> {
  
  it('should handle ADD_POLL', ()=> {
    const poll = {
      id: 0,
      userId: 0,
      name: 'pollName',
      options: [
        {id: 0, name: 'the option'},
        {id: 1, name: 'the other option'}
      ]
    },
          action = {
      type: actions.ADD_POLL,
      poll
    },
          state = [],
          nextState = [poll];
    expect(polls(state, action)).to.deep.equal(nextState);
    
  });
  
  
});