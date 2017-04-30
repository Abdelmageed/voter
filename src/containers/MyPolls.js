import {connect} from 'react-redux';

import MyPolls from '../components/MyPolls';

const getUserPollIds = (state) => {
    const filteredPolls = state.polls.filter((poll) => {
        return poll._author._id === state.user.id
    });
    const pollIds = filteredPolls.map((userPoll) => {
        return userPoll._id
    });
    return pollIds;
}

const mapStateToProps = (state) => ({
    userPollIds: getUserPollIds(state)
});

export default connect(mapStateToProps)(MyPolls);