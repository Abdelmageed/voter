import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {ListGroupItem} from 'react-bootstrap';

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

         const listGroupItemStyle = {
            boxShadow: '0px -1px 1px 1px #999, 0px 1px 1px 1px #999',      
        };

        const leadingOptionStyle = {
            margin: '0px 10px',
            fontSize: 16
        };

        const leadingOptionsContainers = this.getLeadingOptions().map((option, index) => ((
            <span 
                className="leading-option"
                style={leadingOptionStyle}
                key={index}
                >
                    {option.name} : {option.votes.length}
            </span>
        )));

        return (
          <Link to={`/poll/${this.props._id}`}>
            <ListGroupItem style={listGroupItemStyle}>
                <PollTitle 
                    pollName={this.props.name}
                    authorName={this.props._author.local.username}
                    size="sm"
                    showAuthor={this.props.showAuthor}
                    isOwnPoll={isOwnPoll}/>
                {(this.props.showLeadingOptions) ? leadingOptionsContainers : null}
            </ListGroupItem>
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