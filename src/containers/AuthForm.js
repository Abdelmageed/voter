import {connect} from 'react-redux';
import AuthForm from '../components/AuthForm';
import * as actions from '../actions/actionCreators';

const mapStateToProps = (state)=> {
  
  return {
    checkUsernameError: state.user.signup.usernameError,
    loginError: state.user.login.error
  };
};

const mapDispatchToProps = (dispatch)=> {
  return {
    loginSubmit: (credentials)=> {dispatch(actions.login(credentials));},
    signupSubmit: (user)=> {dispatch(actions.signup(user));},
    checkUsername: (username)=> {dispatch(actions.checkUsername(username));}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);