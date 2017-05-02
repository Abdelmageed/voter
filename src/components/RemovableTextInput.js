import RequiredTextInput from './RequiredTextInput';

import {InputGroup, Button} from 'react-bootstrap';
import React,{Component, PropTypes} from 'react';
export default class RemovableTextInput extends Component {
  constructor (props) {
    super (props);
    
    this.handleOnClick = this.handleOnClick.bind (this);
  }
 
  handleOnClick () {
    this.props.removeClicked (this.props.id);
  }

  render () {
    return (
      <InputGroup>
        <RequiredTextInput 
          validating={this.props.validating}
          validateForm={this.props.validateForm}
          errorMessage={this.props.errorMessage}
          id={this.props.id}
          onChange={this.props.onChange}
          value={this.props.value}/>
        <InputGroup.Button >
          <Button bsStyle="danger" onClick={this.handleOnClick}><i className="fa fa-minus" /></Button>
        </InputGroup.Button>
      </InputGroup>          
    );
  }
}

RemovableTextInput.propTypes = {
  value: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  removeClicked: PropTypes.func,
  validating: PropTypes.bool,
  validateForm: PropTypes.func,
  errorMessage: PropTypes.string,
};