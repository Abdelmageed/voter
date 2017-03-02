import {connect} from 'react-redux';
import {LoginForm} from '../components/LoginForm';
import {login} from '../actions/actionCreators';

const mapStateToProps = (state)=> {
  return {
    error: state.user.error
  };
};

const mapDispatchToProps = (dispatch)=> {
  return {
    submit: (credentials)=> {
      dispatch(login(credentials));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);