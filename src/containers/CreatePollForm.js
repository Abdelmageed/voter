import {connect} from 'react-redux';

import {createPoll} from '../actions/actionCreators';
import CreatePollForm from '../components/CreatePollForm';

const mapDispatchToProps = (dispatch)=> ({
  submit: (newPoll)=> dispatch(createPoll(newPoll))
});

export default connect(null, mapDispatchToProps)(CreatePollForm);