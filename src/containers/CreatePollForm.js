import {connect} from 'react-redux';

import {createPoll} from '../actions/actionCreators';
import CreatePollForm from '../components/CreatePollForm';

const mapStateToProps = (state)=> ({
  userId: state.user.id
});

const mapDispatchToProps = (dispatch)=> ({
  submit: (newPoll)=> dispatch(createPoll(newPoll))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePollForm);