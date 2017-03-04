import React, {Component, PropTypes} from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

export class SignupForm extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirm: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e){
    let name = e.target.name,
          value = e.target.value;
    this.setState({
      [name]: value
    });
  }
  
  render(){
    return (
      <form>
        <FormGroup>
          <ControlLabel>username</ControlLabel>
          <FormControl
             type="text"
             value={this.state.username}
             name="username"
             onChange={this.handleChange} />
        </FormGroup>
         <FormGroup>
        <ControlLabel>password</ControlLabel>
          <FormControl
             type="password"
             value={this.state.password}
             name="password"
             onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>username</ControlLabel>
            <FormControl
               type="password"
               value={this.state.passwordConfirm}
               name="passwordConfirm"
               onChange={this.handleChange} />
        </FormGroup>
        <Button></Button>
      </form>
    );
  }
}

SignupForm.propTypes = {
  
};