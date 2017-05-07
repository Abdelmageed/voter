import {connect} from 'react-redux';

import AllPolls from '../components/AllPolls';
import {getAllPolls} from '../actions/actionCreators';

const mapStateToProps = (state)=> ({
  pollIds: state.polls.items.map((poll) => {return poll._id;}),
  status: state.polls.status,
});

const mapDispatchToProps = (dispatch) => ({
  getAllPolls: () => {dispatch(getAllPolls());}
});

export default connect(mapStateToProps, mapDispatchToProps)(AllPolls);