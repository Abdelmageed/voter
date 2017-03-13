import React, {Component, PropTypes} from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap'

export default class CreatePollForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      
    };
  }
  
  render(){
    return (
      <FormGroup id="pollName">
        <ControlLabel>Name:</ControlLabel>
        <FormControl type="text"/>
      </FormGroup>
    );
  }
}

CreatePollForm.propTypes = {
  
};