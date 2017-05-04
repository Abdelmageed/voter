import React, {Component, PropTypes} from 'react';
import {Button} from 'react-bootstrap';

export default class TwitterSignupButton extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Button onClick={this.props.signup}>Signup With Twitter <i className="fa fa-icon-twitter"></i></Button>
        );
    }
}

TwitterSignupButton.propTypes = {
    signup: PropTypes.func,
};