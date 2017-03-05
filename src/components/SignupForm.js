import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

export class SignupForm extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      errors: []
    };
    this.matchError = "Passwords must match";
    
    this.handleChange = this.handleChange.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }
  
  handleChange(e){
    let name = e.target.name,
          value = e.target.value;
    this.setState({
      [name]: value
    });
  }
  
  validatePassword(){
    if (this.state.password === '' ||
        this.state.passwordConfirm === '')
        return;
    this.setState((prevState)=> {
      
      if (prevState.password !== prevState.passwordConfirm){
        return {errors: prevState.errors.concat(this.matchError)};
      }
      return {errors: prevState.errors};
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
             onChange={this.handleChange}
             onBlur={()=>{this.validatePassword()}} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>username</ControlLabel>
            <FormControl
               type="password"
               value={this.state.passwordConfirm}
               name="passwordConfirm"
               onChange={this.handleChange}
               onBlur={()=>{this.validatePassword()}} />
        </FormGroup>
        <Button/>
      </form>
    );
  }
}
