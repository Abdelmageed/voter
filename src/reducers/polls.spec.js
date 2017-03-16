import {expect} from 'chai';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as endpoints from '../constants/endpoints';
import * as actions from '../constants/actions';
import * as actionCreators from '../actions/actionCreators';
import {polls} from './polls';

describe('Polls Reducer', ()=> {
  let axiosMock,
      storeMock,
      axios = endpoints.axiosInstance;
  
  beforeEach(()=> {
    axiosMock = new MockAdapter(axios);
    let middlewares = [thunk];
    storeMock = configureStore(middlewares);
  });
  
  afterEach(()=> {
    axiosMock.restore();
  });
  
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
  
  it('should handle REMOVE_POLL', ()=> {
    const id = 0,
          state = [{
      id,
      name: 'dead poll',
      options: []
    }],
          nextState = [];
    expect(polls(state, actionCreators.deletePoll(id))).to.deep.equal(nextState);
  });
  
  describe('createPoll thunk', ()=> {
    
    it('adds a new poll to the state on success(it does not wait for response, optimistic UI)', (done)=> {
    const poll = {
      id: 0,
      userId: 0,
      name: 'pollName',
      options: [
        {id: 0, name: 'the option'},
        {id: 1, name: 'the other option'}
      ]
    }
    const expectedActions = [
      actionCreators.addPoll(poll)
    ];
    const store = storeMock({});
    
    store.dispatch(actionCreators.createPoll(poll));
    axiosMock.onPost(endpoints.createPoll)
      .reply(200, poll);
    
    setTimeout(()=> {
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    }, 10);
    
  });
    
    it('removes the added poll on response error', (done)=> {
      
      const poll = {
      id: 0,
      userId: 0,
      name: 'pollName',
      options: [
        {id: 0, name: 'the option'},
        {id: 1, name: 'the other option'}
      ]
    }
    const expectedActions = [
      actionCreators.addPoll(poll),
      actionCreators.deletePoll(0)
    ];
    const store = storeMock({});
    
    store.dispatch(actionCreators.createPoll(poll));
    axiosMock.onPost(endpoints.createPoll)
      .reply(500);
    
    setTimeout(()=> {
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    }, 10);
      
    });
    
  });
 
});