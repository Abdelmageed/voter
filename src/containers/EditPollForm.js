import {connect} from 'react-redux';

import {modifyPoll} from '../actions/actionCreators';
import PollForm from '../components/PollForm';

const mapStateToProps = (state)=> ({
  userId: state.user.id,
  username: state.user.username
});

const mapDispatchToProps = (dispatch)=> ({
  submit: (newPoll, poll)=> dispatch(modifyPoll(newPoll, poll))
});

export default connect(mapStateToProps, mapDispatchToProps)(PollForm);