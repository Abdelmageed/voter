import {connect} from 'react-redux';

import {modifyPoll} from '../actions/actionCreators';
import Poll from '../components/Poll';

const getVotedPoll = (poll, optionId, ip) => {
    return Object.assign({}, poll, {
        options: poll.options.map((option) => {
            if(option._id === optionId) {
                return Object.assign({}, option, {votes: option.votes.concat(ip)});
            }
            return option;
        })
    });
};

const mapStateToProps = (state, ownProps) => {
    const poll = state.polls.filter((poll) => {
        return (poll._id === ownProps._id);
    })[0];
    return {
        ip: state.user.ip,
        ...poll
    };
};

const mapDispatchToProps = (dispatch) => ({
    vote: (poll, optionId, ip) => {
        const votedPoll = getVotedPoll(poll, optionId, ip);
        dispatch(modifyPoll(poll, votedPoll));
    }
});

export default connect(mapStateToProps, mapDispatchToProps) (Poll);