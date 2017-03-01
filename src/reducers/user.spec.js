import {expect} from 'chai';
//import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {user} from './user';
import {initialState} from '../initialState';
import * as actionNames from '../constants/actions';
import * as endpoints from '../constants/endpoints';
import * as actions from '../actions/actionCreators';

let axiosMock,
    storeMock,
    axios = endpoints.axiosInstance;
describe('User Reducer', ()=> {
  
  before(()=> {
    axiosMock = new MockAdapter(axios);
    let middlewares = [thunk];
    storeMock = configureStore(middlewares);
  });
  
  after(()=> {
    axiosMock.restore();
  });
  
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
      type: actionNames.SET_USER,
      user: {
        id: '123',
        username: 'John Doe'
      }
    },
          state = initialState.user,
          nextState = Object.assign({}, state, action.user);
    
    expect(user(state, action)).to.deep.equal(nextState);
  });
  
  it('should handle LOGIN_SUCCES', ()=> {
    const action = actions.loginSuccess(),
          state = {
            isAuthenticated: false,
            loggingIn: true
          },
          nextState = Object.assign({}, state, {isAuthenticated: true, loggingIn: false});
    
    expect(user(state, action)).to.deep.equal(nextState);
  });
  
  it('should handle LOGIN_FAILURE', ()=> {
    const action = actions.loginFailure(),
          state = {
            isAuthenticated: false,
            loggingIn: true
          },
          nextState = Object.assign({}, state, {isAuthenticated: false, loggingIn: false});
      
      expect(user(state, action)).to.deep.equal(nextState);
  });
  
  it('should set user on successful login', (done)=> {
    const userData = {
      id: 1,
      username: 'name'
    },
          credentials = {
            username: 'name',
            password: 'password'
          };
    axiosMock.onPost(endpoints.login)
      .reply(200, userData);
    
    const state = {
            loggingIn: false,
            isAuthenticated: false
          },
          expectedActions = [
            actions.loginSuccess(),
            actions.setUser(userData)
          ];
    
    const store = storeMock(state);
    
    store.dispatch(actions.login(credentials));
    setTimeout(()=> {
      
        expect(store.getActions()).to.deep.equal(expectedActions);
        done();
    }, 10);
  });
  
});