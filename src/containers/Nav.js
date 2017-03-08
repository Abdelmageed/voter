import {connect} from 'react-redux';

import Nav from '../components/Nav';

const mapStateToProps = (state)=> ({
  authenticated: state.user.isAuthenticated,
  username: state.user.username
});

//const mapDispatchToProps = (dispatch)=> {
//  
//};

export default connect(mapStateToProps, null)(Nav);