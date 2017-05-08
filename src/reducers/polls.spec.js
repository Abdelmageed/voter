import {expect} from 'chai';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {push} from 'react-router-redux';

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
    ],
    _author: '123'    
  },
    anotherFakePoll = {
      _id: 1,
      userId: 0,
      name: 'the poll name',
      options: [
        {_id: 0, name: 'the option'},
        {_id: 1, name: 'the other option'}
      ],
      _author: '123'
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
          state = {items: [], status: 'ready'},
          nextState = {items: [fakePoll], status: 'ready'};
    expect(polls(state, action)).to.deep.equal(nextState);
    
  });
  
  it('should handle REMOVE_POLL', () => {
    const _id = 0,
          state = {
            status: 'ready',
            items: [{
              _id,
              name: 'dead poll',
              options: []
            }]},
          nextState = {status: 'ready', items: []};
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
    
  });
 
  it('should handle SET_POLLS', () => {
    const state = {status: 'ready', items: []},
          allPolls = [{name: 'name', options: []},
                   {name: 'another name', options: []}],
          nextState = {status: 'ready', items: allPolls};
    expect(polls(state, actionCreators.setPolls(allPolls))).to.deep.equal(nextState);
  });
  
  describe('getAllPolls thunk', () => {
    
    it('calls getRequestPending, then sets state.polls.items to response.data.polls, then getRequestSuccess', (done) => {
      
      const allPolls = [
          {name: 'name', options: []},
          {name: 'another name', options: []}
        ];
      const expectedActions = [
        actionCreators.getRequestPending(),
        actionCreators.setPolls(allPolls),
        actionCreators.getRequestSuccess()
      ];
      const store = storeMock({});
      store.dispatch(actionCreators.getAllPolls());
      axiosMock.onGet(endpoints.getAllPolls)
        .reply(200, {polls: allPolls});
      
    setTimeout(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    }, 10);  
      
    });
  });

  describe('getPoll thunk', () => {

    it('returns if poll with given id was found in state.polls.items', (done) => {

      const allPolls = [
        {_id: 'found', name: 'got you', options: []}
      ];
      const expectedActions = [];
      const store = storeMock({polls: {items: allPolls, status: 'ready'}});

      store.dispatch(actionCreators.getPoll('found'));
      setTimeout(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
        done();
      }, 10);
    });

    it('if poll was not found, it calls getRequestPending, then appends response.data.poll to state.polls.items, then calls getRequestSuccess', (done) => {

       const allPolls = [
        {_id: 'not found', name: 'not there', options: []}
      ],
        requestedPoll = {
          _id: 'id', name: 'poll name', options: []
        };
      const expectedActions = [
        actionCreators.getRequestPending(),
        actionCreators.addPoll(requestedPoll),
        actionCreators.getRequestSuccess()
        ];

      const store = storeMock({polls: {status: 'ready', items: allPolls}});
      axiosMock.onGet(endpoints.getPoll + 'id')
        .reply(200, {poll: requestedPoll});
      store.dispatch(actionCreators.getPoll('id'));
      
      setTimeout(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
        done();
      }, 10);
  });

  });

  it('should handle EDIT_POLL', () => {
      const modifiedPoll = Object.assign({}, fakePoll, {name: 'modified poll name'});
      const state = {status: 'ready', items: [fakePoll, anotherFakePoll]},
        nextState = {status: 'ready', items: [modifiedPoll, anotherFakePoll]},
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
      
      store.dispatch(actionCreators.modifyPoll(modifiedPoll ,fakePoll));
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
      
      store.dispatch(actionCreators.modifyPoll(modifiedPoll ,fakePoll));
      axiosMock.onPut(endpoints.modifyPoll)
        .reply(500);
      
      setTimeout(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
        done();
      }, 10);
    });

  });

  describe('removePoll thunk', () => {
    it('should redirect to previous route if it exists and delete poll on response success', (done) => {
      const pollId = 'theCondemnedPollId';

      const expectedActions = [
        push('/'),
        actionCreators.deletePoll(pollId)
      ];
      const store = storeMock({});

      store.dispatch(actionCreators.removePoll(pollId));
      axiosMock.onDelete(endpoints.removePoll)
        .reply(200);

      setTimeout(() => {
        expect(store.getActions()).to.deep.equal(expectedActions);
        done();
      }, 10);
    });
  });

  it('should handle GET_REQUEST_PENDING', () => {
    const state = {status: 'ready', items: []},
      nextState = {status: 'loading', items: []},
      action = actionCreators.getRequestPending();

    expect(polls(state, action)).to.deep.equal(nextState);
  });

  it('should handle GET_REQUEST_SUCCESS', () => {
    const state = {status: 'loading', items: []},
      nextState = {status: 'ready', items: []},
      action = actionCreators.getRequestSuccess();

    expect(polls(state, action)).to.deep.equal(nextState);
  });
  
});