import React, {Component, PropTypes} from 'react';
import {Form, FormGroup, FormControl, Button, HelpBlock} from 'react-bootstrap'; 

export default class VoteInput extends Component{
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.makeNewOption = this.makeNewOption.bind(this);

        this.state = {
            optionName: ''
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        //call addOptiont
        const newOption = this.makeNewOption();
        this.props.addNewOption(newOption);
    }

    handleChange(e) {
        this.setState({
            optionName: e.target.value 
        });
    }

    makeNewOption() {
        return {
            name: this.state.optionName,
            votes: [this.props.ip]
        };
    }

    render() {
        return (
            <Form inline onSubmit={this.handleSubmit}>
                <FormGroup>
                    <FormControl 
                        placeholder="Your own option"
                        onChange={this.handleChange}
                        />
                    <FormControl.Feedback />
                    <Button
                        type="submit"
                    >
                        Vote
                    </Button>
                </FormGroup>
            </Form>
        );
    }
}

VoteInput.propTypes = {
    ip: PropTypes.string
};