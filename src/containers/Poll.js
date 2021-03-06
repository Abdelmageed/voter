import {connect} from 'react-redux';

import {modifyPoll, getPoll} from '../actions/actionCreators';
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

const getPollWithNewOption = (poll, newOption) => {
    return Object.assign({}, poll, {options: poll.options.concat(newOption)});
};

const mapStateToProps = (state, ownProps) => {
    
    const poll = state.polls.items.filter((poll) => {
        return (poll._id === ownProps.params._id);
    })[0];
    return {
        ip: state.user.ip,
        ...poll,
        isAuthenticated: state.user.isAuthenticated,
        userId: state.user.id,
        status: state.polls.status
    };
};

const mapDispatchToProps = (dispatch) => ({
    vote: (poll, optionId, ip) => {
        const votedPoll = getVotedPoll(poll, optionId, ip);
        dispatch(modifyPoll(votedPoll, poll));
    },
    addNewOption: (poll, newOption) => {
        
        const pollWithNewOption = getPollWithNewOption(poll, newOption);
        dispatch(modifyPoll(pollWithNewOption ,poll));
    },
    getPoll: (id) => {dispatch(getPoll(id)); }
});

export default connect(mapStateToProps, mapDispatchToProps) (Poll);