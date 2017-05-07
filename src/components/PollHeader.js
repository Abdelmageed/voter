import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import PollTitle from './PollTitle';

export default class PollHeader extends Component {
    constructor(props) {
        super(props);

        this.getLeadingOptions = this.getLeadingOptions.bind(this);
    }

    getLeadingOptions() {
        return this.props.options.sort((a, b) => {return b.votes.length - a.votes.length;})
            .slice(0, 2);
    }

    render() {

        const isOwnPoll = (this.props.userId === this.props._author._id);

        const leadingOptionsContainers = this.getLeadingOptions().map((option, index) => ((
            <div 
                className="leading-option"
                key={index}>
                {option.name} : {option.votes.length}
            </div>
        )));

        return (
          <Link to={`/poll/${this.props._id}`}>
            <PollTitle 
                pollName={this.props.name}
                authorName={this.props._author.local.username}
                size="sm"
                showAuthor={this.props.showAuthor}
                isOwnPoll={isOwnPoll}/>
            {(this.props.showLeadingOptions) ? leadingOptionsContainers : null}
          </Link>  
        );
    }
}

PollHeader.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    showAuthor: PropTypes.bool,
    _author: PropTypes.object,
    options: PropTypes.arrayOf(PropTypes.object),
    showLeadingOptions: PropTypes.bool,
    userId: PropTypes.string,
};