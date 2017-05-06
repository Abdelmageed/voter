import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import PollTitle from './PollTitle';

export default class PollHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const title = (this.props.showAuthor) ? (
            <h3 id="headerTitle">{this.props.name} By <strong>{this.props._author.local.username}</strong></h3>
        ) : (
            <h3 id="headerTitle">{this.props.name}</h3>
        );

        return (
          <Link to={`poll/${this.props._id}`}>
            <PollTitle 
                pollName={this.props.name}
                authorName={this.props._author.local.username}
                size="sm"
                showAuthor/>
          </Link>  
        );
    }
}

PollHeader.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    showAuthor: PropTypes.bool,
    _author: PropTypes.object,
};