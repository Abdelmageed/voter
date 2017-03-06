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
import * as errors from '../constants/errors';

let axiosMock,
    storeMock,
    axios = endpoints.axiosInstance;
describe('User Reducer', ()=> {
  
  beforeEach(()=> {
    axiosMock = new MockAdapter(axios);
    let middlewares = [thunk];
    storeMock = configureStore(middlewares);
  });
  
  afterEach(()=> {
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
            loggingIn: true,
            error: errors.login
          },
          nextState = Object.assign({}, state, {isAuthenticated: true, loggingIn: false, error: ''});
    
    expect(user(state, action)).to.deep.equal(nextState);
  });
  
  it('should handle LOGIN_FAILURE', ()=> {
    const action = actions.loginFailure(errors.login),
          state = {
            isAuthenticated: false,
            loggingIn: true
          },
          nextState = Object.assign({}, state, {
            isAuthenticated: false,
            loggingIn: false,
            error: errors.login
          });
      
      expect(user(state, action)).to.deep.equal(nextState);
  });
  
  it('should handle LOGIN_PENDING', ()=> {
    const action = actions.loginPending(),
          state = {
            isAuthenticated: false,
            loggingIn: false
          },
          nextState = Object.assign({}, state, {isAuthenticated: false, loggingIn: true});
      
      expect(user(state, action)).to.deep.equal(nextState);
  });
  
  it('should handle SET_USERNAME_ERROR', ()=> {
    const action = actions.setUsernameError(),
          state = {},
          nextState = {
            signup:{
              usernameError: errors.usernameInUse
            }
          };
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
            actions.loginPending(),
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
  
  it('should set a login error message on unsuccessful login', (done)=> {
    const credentials = {
            username: 'name',
            password: 'password'
          };
    axiosMock.onPost(endpoints.login)
      .reply(401);
    
    const state = {
            loggingIn: false,
            isAuthenticated: false
          },
          expectedActions = [
            actions.loginPending(),
            actions.loginFailure(errors.login)
          ];
    
    const store = storeMock(state);
    
    store.dispatch(actions.login(credentials));
    
    setTimeout(()=> {
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    }, 10);
  });
  
  it('should set a "username in use" error on signup if response.valid === false', (done)=> {
    
    const name = 'name';
    axiosMock.onGet(endpoints.checkUsername)
      .reply(200, {valid: false});
    
    const expectedActions = [
      actions.setUsernameError(errors.usernameInUse)
    ];
    const store = storeMock({});
    
    store.dispatch(actions.checkUsername(name));
    
    setTimeout(()=> {
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    }, 10);
    
  });
  
  it('should set username in use error to "" if response.valid', (done)=> {
    const name = 'name';
    axiosMock.onGet(endpoints.checkUsername)
      .reply(200, {valid: true});
    
    const expectedActions = [
      actions.setUsernameError('')
    ];
    const store = storeMock({});
    
    store.dispatch(actions.checkUsername(name));
    
    setTimeout(()=> {
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    }, 10);
  });
  
  it('should set user and login on successful signup', (done)=> {
    const userData = {
      id: 1,
      username: 'name'
    },
          formData = {
            username: 'name',
            password: 'password'
          };
    axiosMock.onPost(endpoints.signup)
      .reply(200, userData);
    
    const expectedActions = [
            actions.loginPending(),
            actions.loginSuccess(),
            actions.setUser(userData)
          ];
    const store = storeMock({});
    
    store.dispatch(actions.signup(formData));
    
    setTimeout(()=> {
      expect(store.getActions()).to.deep.equal(expectedActions);
      done();
    });
  });
});