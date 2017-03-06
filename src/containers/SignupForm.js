import {connect} from 'react-redux';
import {SignupForm} from '../components/SignupForm';
import {signup, checkUsername} from '../actions/actionCreators';

const mapStateToProps = (state)=> {
  return {
    checkUsernameError: state.user.signup.usernameError
  };
};

const mapDispatchToProps = (dispatch)=> {
  return {
    submit: (user)=> {
      dispatch(signup(user));
    },
    checkUsername: (username)=> {
      dispatch(checkUsername(username));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);