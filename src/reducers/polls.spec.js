import {expect} from 'chai';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as endpoints from '../constants/endpoints';
import * as actions from '../constants/actions';
import * as actionCreators from '../actions/actionCreators';
import {polls} from './polls';

describe('Polls Reducer', () => {
  let axiosMock,
      storeMock,
      axios = endpoints.axiosInstance;

  const fakePoll = {
    _id: 0,
    userId: 0,
    name: 'pollName',
    options: [
      {_id: 0, name: 'the option'},
      {_id: 1, name: 'the other option'}
    ]
  },
    anotherFakePoll = {
      _id: 1,
      userId: 0,
      name: 'the poll name',
      options: [
        {_id: 0, name: 'the option'},
        {_id: 1, name: 'the other option'}
      ]
    };
  
  beforeEach(() => {
    axiosMock = new MockAdapter(axios);
    let middlewares = [thunk];
    storeMock = configureStore(middlewares);
  });
  
  afterEach(() => {
    axiosMock.restore();
  });
  
  it('should handle ADD_POLL', () => {
      const action = {
      type: actions.ADD_POLL,
      poll: fakePoll
    },
          state = [],
          nextState = [fakePoll];
    expect(polls(state, action)).to.deep.equal(nextState);
    
  });
  
  it('should handle REMOVE_POLL', () => {
    const _id = 0,
          state = [{
      _id,
      name: 'dead poll',
      options: []
    }],
          nextState = [];
    expect(polls(state, actionCreators.deletePoll(_id))).to.deep.equal(nextState);
  });
  
  describe('createPoll thunk', () => {
    
    it('adds a new poll to the state on success', (done) => {
    
    const fakeAuthor = {
      _id: 'id519',
      local: {
        username: 'fake name'
      }
    }; 
    const populatedPoll = Object.assign({}, fakePoll, {_author: fakeAuthor});
    const expectedActions = [
      actionCreators.addPoll(populatedPoll)
    ];
    const store = storeMock({});
    
    store.dispatch(actionCreators.createPoll(fakePoll, fakeAuthor));
    axiosMock.onPost(endpoints.createPoll)
      .reply(200, populatedPoll);
    
    setTimeout(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    }, 10);
    
  });
    
    // it('removes the added poll on response error', (done) => {
    //  const fakeAuthor = {
    //   _id: 'id519',
    //   local: {
    //     username: 'fake name'
    //   }
    // }; 
    // const populatedPoll = Object.assign({}, fakePoll, {_author: fakeAuthor});
    // const expectedActions = [
    //   actionCreators.addPoll(populatedPoll),
    //   actionCreators.deletePoll(fakePoll._id)
    // ];
    // const store = storeMock({});
    
    // store.dispatch(actionCreators.createPoll(fakePoll, fakeAuthor));    
    // axiosMock.onPost(endpoints.createPoll)
    //   .reply(500);
    
    // setTimeout(() => {
    //   expect(store.getActions()).to.deep.equal(expectedActions);
    //   done();
    // }, 10);
      
    // });
    
  });
 
  it('should handle SET_POLLS', () => {
    const state = [],
          allPolls = [{name: 'name', options: []},
                   {name: 'another name', options: []}],
          nextState = allPolls;
    expect(polls(state, actionCreators.setPolls(allPolls))).to.deep.equal(nextState);
  });
  
  describe('getAllPolls thunk', () => {
    
    it('loads state.polls with response.data.polls', (done) => {
      
      const allPolls = [{name: 'name', options: []},
                   {name: 'another name', options: []}];
      const expectedActions = [
        actionCreators.setPolls(allPolls)
      ];
      const store = storeMock({});
      store.dispatch(actionCreators.getAllPolls());
      axiosMock.onGet(endpoints.getAllPolls)
        .reply(200, {polls: allPolls});
      
    setTimeout(() => {             expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    }, 10);  
      
      
    });
  });

  it('should handle EDIT_POLL', () => {
      const modifiedPoll = Object.assign({}, fakePoll, {name: 'modified poll name'});
      const state = [fakePoll, anotherFakePoll],
        nextState = [modifiedPoll, anotherFakePoll],
        action = actionCreators.editPoll(fakePoll._id, modifiedPoll);

      expect(polls(state, action)).to.deep.equal(nextState);
  });

  describe('modifyPoll thunk', () => {
    
    it('should edit poll optimistically', (done) => {
      const modifiedPoll = Object.assign({}, fakePoll, {name: 'modified poll name'});
      
      const expectedActions = [
        actionCreators.editPoll(fakePoll._id, modifiedPoll)
      ];
      const store = storeMock({});
      
      store.dispatch(actionCreators.modifyPoll(fakePoll, modifiedPoll));
      axiosMock.onPut(endpoints.modifyPoll)
        .reply(200);
      
      setTimeout(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
        done();
      }, 10);
    });

    it('should revert edit poll on server error', (done) => {
      const modifiedPoll = Object.assign({}, fakePoll, {name: 'modified poll name'});
      
      const expectedActions = [
        actionCreators.editPoll(fakePoll._id, modifiedPoll),
        actionCreators.editPoll(fakePoll._id, fakePoll)
      ];
      const store = storeMock({});
      
      store.dispatch(actionCreators.modifyPoll(fakePoll, modifiedPoll));
      axiosMock.onPut(endpoints.modifyPoll)
        .reply(500);
      
      setTimeout(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
        done();
      }, 10);
    });

  });
  
});