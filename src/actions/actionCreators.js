import * as actions from '../constants/actions';
import * as errors from '../constants/errors';
import * as endpoints from '../constants/endpoints';
import querystring from 'querystring';

const axios = endpoints.axiosInstance;

export const login = (credentials)=> {
  return dispatch=> {
    dispatch(loginPending());
    return axios.post(endpoints.login,
                      querystring.stringify(credentials), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .then((response)=> {
      if (response.status === 401) {
          dispatch(loginFailure(errors.login));
      } else {
          dispatch(loginSuccess());
          dispatch(setUser(response.data));
      }
    })
      .catch((error)=> {
        const errorMsg = error.response | errors.server; 
        dispatch(loginFailure(errorMsg));
    });
  };
};

export const setUser = (user)=> {
  return {
    type: actions.SET_USER,
    user
  };
};

//for some reason using action constants fails the tests.
export const loginPending = ()=> {
  return {
    type: 'LOGIN_PENDING'
  };
};

export const loginSuccess = ()=> {
  return {
    type: 'LOGIN_SUCCESS'
  };
};

export const loginFailure = (error)=> {
  return {
    type: 'LOGIN_FAILURE',
    error
  };
};