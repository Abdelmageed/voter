import {connect} from 'react-redux';

import {createPoll} from '../actions/actionCreators';
import PollForm from '../components/PollForm';

const mapStateToProps = (state)=> ({
  userId: state.user.id,
  username: state.user.username
});

const mapDispatchToProps = (dispatch)=> ({
  submit: (newPoll, author)=> dispatch(createPoll(newPoll, author))
});

export default connect(mapStateToProps, mapDispatchToProps)(PollForm);