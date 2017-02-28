import {LOGIN, SET_USER} from './actions';
export const login = (credentials)=> {
  return {
    type: LOGIN,
    credentials
  };
};

export const setUser = (user)=> {
  return {
    type: SET_USER,
    user
  };
};