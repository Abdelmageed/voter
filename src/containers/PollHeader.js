import {connect} from 'react-redux';

import PollHeader from '../components/PollHeader';

const mapStateToProps = (state, ownProps) => {
    const poll = state.polls.filter((poll) => {
        return (poll._id === ownProps._id);
    })[0];
    return {
        ...poll,
        userId: state.user.id
    };
};

export default connect(mapStateToProps)(PollHeader);