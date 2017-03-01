import * as actions from '../constants/actions';
//import axios from 'axios';
import * as endpoints from '../constants/endpoints';
import querystring from 'querystring';

const axios = endpoints.axiosInstance;

export const login = (credentials)=> {
  return dispatch=> {
    return axios.post(endpoints.login,
                      querystring.stringify(credentials), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .then((response)=> {
      dispatch(loginSuccess());
      dispatch(setUser(response.data));
    })
      .catch((error)=> {
      dispatch(loginFailure());
    });
  }
};

export const setUser = (user)=> {
  return {
    type: actions.SET_USER,
    user
  };
};

//for some reason using action constants fails the tests. 
export const loginSuccess = ()=> {
  return {
    type: 'LOGIN_SUCCESS'
  };
};

export const loginFailure = ()=> {
  return {
    type: 'LOGIN_FAILURE'
  };
};