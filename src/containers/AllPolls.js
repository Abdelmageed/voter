import {connect} from 'react-redux';

import AllPolls from '../components/AllPolls';

const mapStateToProps = (state)=> ({
  pollIds: state.polls.items.map((poll) => {return poll._id;})
});

export default connect(mapStateToProps)(AllPolls);