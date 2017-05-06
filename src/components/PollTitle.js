import React, {Component, PropTypes} from 'react';

export default class PollTitle extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const author = (
            <strong>
                By {(this.props.isOwnPoll) ? 'You' : this.props.authorName}
            </strong>
        );

        const content = (
            <div>
                {this.props.pollName} {this.props.showAuthor ? author : null}
            </div>
        );

        const title = (this.props.size === "sm") ? (
            <h4>{content}</h4>
        ) : (
            <h2>{content}</h2>
        );

        return title;
    }
}

PollTitle.propTypes = {
    isOwnPoll: PropTypes.bool,
    pollName: PropTypes.string,
    authorName: PropTypes.string,
    size: PropTypes.string,
    showAuthor: PropTypes.bool,
};