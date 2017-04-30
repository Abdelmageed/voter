import React, {Component, PropTypes} from 'react';
import {Form, FormGroup, InputGroup, FormControl, Button, HelpBlock} from 'react-bootstrap'; 

export default class VoteInput extends Component{
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.makeNewOption = this.makeNewOption.bind(this);
        this.getOptionNameValidation = this.getOptionNameValidation.bind(this);
        this.getStateValidation = this.getStateValidation.bind(this);

        this.state = {
            optionName: '',
            isValid: true
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        if(!this.getOptionNameValidation()) {return;}
        const newOption = this.makeNewOption();
        this.props.addNewOption(newOption);
    }

    getOptionNameValidation() {
        if (this.state.optionName === '') {
            this.setState({
                isValid: false
            });
            return false;
        } else {
             this.setState({
                isValid: true
            });
            return true;
        }
    }

    getStateValidation() {
        return (this.state.isValid) ? null : "error";
    }

    handleChange(e) {
        this.setState({
            optionName: e.target.value 
        }, () => {
            this.getOptionNameValidation();
        });
    }

    makeNewOption() {
        return {
            name: this.state.optionName,
            votes: [this.props.ip]
        };
    }

    render() {
        const validationState = this.getStateValidation();
        return (
            <Form inline onSubmit={this.handleSubmit}>
                <FormGroup validationState={validationState}>
                    <InputGroup>
                        <FormControl 
                            placeholder="Your own option"
                            onChange={this.handleChange}
                            />
                        <FormControl.Feedback />
                        <InputGroup.Button>
                            <Button type="submit">
                                Vote
                            </Button>
                        </InputGroup.Button>
                    </InputGroup>
                    {!this.state.isValid ? 
                        <HelpBlock>Option name cannot be empty</HelpBlock> : null}
                </FormGroup>
            </Form>
        );
    }
}

VoteInput.propTypes = {
    ip: PropTypes.string,
    addNewOption: PropTypes.func
};