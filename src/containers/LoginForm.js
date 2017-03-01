import {connect} from 'react-redux';
import {LoginForm} from '../components/LoginForm';
import {login} from '../actions/actionCreators';

const mapDispatchToProps = (dispatch)=> {
  return {
    submit: (credentials)=> {
      dispatch(login(credentials));
    }
  };
};

export default connect(null, mapDispatchToProps)(LoginForm);