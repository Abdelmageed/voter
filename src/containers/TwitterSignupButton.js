import {connect} from 'react-redux';

import {twitterSignup} from '../actions/actionCreators';
import TwitterSignupButton from '../components/TwitterSignupButton';

const mapDispatchToProps = (dispatch) => ({
    signup: () => {dispatch(twitterSignup());}
});

export default connect(null, mapDispatchToProps) (TwitterSignupButton);