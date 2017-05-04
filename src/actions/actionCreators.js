import querystring from 'querystring';
import jsonp from 'jsonp';
import {push} from 'react-router-redux';

import * as actions from '../constants/actions';
import * as errors from '../constants/errors';
import * as endpoints from '../constants/endpoints';

import session from '../util/session';

//TODO handle internal server error on response.catch

//thunks
const axios = endpoints.axiosInstance;

export const getIp = () => {
  return (dispatch) => {
    jsonp('https://api.ipify.org?format=jsonp', null, (err, data) => {
      dispatch(setIp(data.ip));
    });
  };
};

export const login = (credentials) => {
  return (dispatch) => {
    //TODO need to show a spinner on login pending, hide on success or failure
    dispatch(loginPending());
    return axios.post(endpoints.login,
                      querystring.stringify(credentials), {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .then((response) => {
      if (response.status === 401) {
          dispatch(loginFailure(errors.login));
      } else {
          dispatch(loginSuccess());
          dispatch(setUser(response.data.user));
          session.setSessionId(response.data.sessionId);
      }
    })
      .catch((error) => {
        const errorMsg = error.response || errors.server;
        dispatch(loginFailure(errorMsg));
      });
  };
};

export const signup = (user) => {
  return (dispatch) => {
    dispatch(loginPending());
    return axios.post(endpoints.signup,
                     querystring.stringify(user),{
                     headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .then((response) => {
        dispatch(loginSuccess());
        dispatch(setUser(response.data.user));
        session.setSessionId(response.data.sessionId);        
      })
      .catch((error) => {
        if (error.respone) throw error.response;
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    return axios.get(endpoints.logout)
      .then(() => {
        dispatch(removeUser());
        dispatch(push('/'));
        session.setSessionId('');      
     })
      .catch((error) => {
        if (error.response) throw error.response;
    });
  };
};

export const twitterSignup = () => {
  return (dispatch) => {
    return axios.get(endpoints.twitterSignup)
      .then((response) => {
      if (response.status === 401) {
          dispatch(loginFailure(errors.twitterSignup));
      } else {
          dispatch(loginSuccess());
          dispatch(setUser(response.data.user));
          session.setSessionId(response.data.sessionId);
      }
    })
      .catch((error) => {
        const errorMsg = error.response.data || errors.server;
        dispatch(loginFailure(errorMsg));
      });
  };
}

export const checkUsername = (username) => {
  return (dispatch) => {
    return axios.post(endpoints.checkUsername, querystring.stringify({username}),{
                     headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      .then((response) => {
      let error = (response.data.valid)? '' : errors.usernameInUse;
      dispatch(setUsernameError(error));
    })
    .catch((error) => {
      //TODO flash error message
      if(error.response) throw error.response;
    });
  };
};

export const createPoll = (poll) => {
  return (dispatch) => {
    return axios.post(
      endpoints.createPoll,
      poll, {
        headers: {'Content-Type': 'application/json'}
      })
      .then((response) => {
        dispatch(addPoll(response.data));
      })
      .catch((error) => {
        //TODO flash error message
        if(error.response) throw error.response;
    });
  };
};

export const modifyPoll = (newPoll, poll) => {
  return (dispatch) => {
    dispatch(editPoll(poll._id, newPoll));
    return axios.put(
      endpoints.modifyPoll,
      JSON.stringify({
        id: poll._id,
        newPoll
      }), {
        headers: {'Content-Type': 'application/json'}
      })
      .catch((error) => {
        //edit the modified poll to the old poll (revert modification)
        dispatch(editPoll(poll._id, poll));
        if(error.response) throw error.response;
      });
  };
};

export const getAllPolls = () => {
  return (dispatch) => {
    return axios.get(endpoints.getAllPolls)
      .then((response) => {
        dispatch(setPolls(response.data.polls));
    })
    .catch((error) => {
      //TODO flash error message
      if(error.response) throw error.response;
    });
  };
};

export const removePoll = (id) => {
  return (dispatch) => {
    return axios.delete(endpoints.removePoll + id)
      .then(() => {
        dispatch(deletePoll(id));
      })
      .catch((error) => {
         //TODO flash error message
        if(error.response) throw error.response;
      });
  };
};

//end thunks

export const removeUser = () => {
  return {
    type: 'REMOVE_USER'
  };
};

export const setUsernameError = (error) => {
  return {
    type: 'SET_USERNAME_ERROR',
    error
  };
};

export const setUser = (user) => {
  return {
    type: actions.SET_USER,
    user
  };
};

export const setIp = (ip) => ({
  type: actions.SET_IP,
  ip
});

export const addPoll = (poll) => ({
  type: actions.ADD_POLL,
  poll
});

export const deletePoll = (_id) => ({
  type: actions.DELETE_POLL,
  _id
});

export const editPoll = (_id, newPoll) => ({
  type: actions.EDIT_POLL,
  _id,
  newPoll
});

export const setPolls = (polls) => ({
  type: actions.SET_POLLS,
  polls
});

//for some reason using action constants fails the tests.
export const loginPending = () => {
  return {
    type: 'LOGIN_PENDING'
  };
};

export const loginSuccess = () => {
  return {
    type: 'LOGIN_SUCCESS'
  };
};

export const loginFailure = (error) => {
  return {
    type: 'LOGIN_FAILURE',
    error
  };
};
