import React, {Component, PropTypes} from 'react';
import {HelpBlock, FormGroup, FormControl} from 'react-bootstrap';

export default class RequiredTextInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isValid: true,
            value: this.props.value ? this.props.value : ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.getValidation = this.getValidation.bind(this);
        this.getValidationState = this.getValidationState.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.validating) {
            this.props.validateForm(this.props.id, this.getValidation());
        }
    }

    getValidation() {
        if (this.state.value === '') {
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

    getValidationState() {
        return (this.state.isValid) ? null : "error";
    }

    handleChange(e) {
        const value = e.target.value;
        this.setState({value}, () => {
            this.getValidation();
        });
        this.props.onChange(this.props.id, value);
    }

    render() {
        const validationState = this.getValidationState();
        return (
            <FormGroup validationState={validationState}>
                <FormControl onChange={this.handleChange} value={this.state.value}/>
                {
                    !this.state.isValid ? 
                    <HelpBlock>{this.props.errorMessage}</HelpBlock> : null
                }
            </FormGroup>
        );
    }
}

RequiredTextInput.propTypes = {
    validating: PropTypes.bool,
    validateForm: PropTypes.func,
    errorMessage: PropTypes.string,
    id: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
};