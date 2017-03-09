import {connect} from 'react-redux';

import {logout} from '../actions/actionCreators';
import Nav from '../components/Nav';

const mapStateToProps = (state)=> ({
  authenticated: state.user.isAuthenticated,
  username: state.user.username
});

const mapDispatchToProps = (dispatch)=> ({
  logout: ()=> {dispatch(logout());}
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);