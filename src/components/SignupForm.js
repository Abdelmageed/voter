import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

export class SignupForm extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      matchError: ''
    };
    this.matchError = "Passwords must match";
    
    this.handleChange = this.handleChange.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.removePasswordError = this.removePasswordError.bind(this);
    this.validateSubmit = this.validateSubmit.bind(this);
  }
  
  handleChange(e, callback){
    let name = e.target.name,
          value = e.target.value;
    this.setState({
      [name]: value
    }, callback);
  }
  
  validatePassword(){
    if (this.state.password === '' ||
        this.state.passwordConfirm === '')
        return;
    this.setState((prevState)=> {
      
      if (prevState.password !== prevState.passwordConfirm){
        return {matchError: this.matchError};
      }
      return {matchError: ''};
    });
  }
  
  removePasswordError(){
    if(this.state.password === this.state.passwordConfirm){
      this.setState({
        matchError: ''
      });
    }
  }
  
  validateSubmit(){
    this.removePasswordError();
    //this.checkUniqueUsername();
    
    if(this.state.matchError == '' /* && usernameError === '' */) {
      let user = {
        username: this.state.username,
        password: this.state.password
      };
      this.props.submit(user);
    }
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
             onChange={(e)=>{this.handleChange(e);}} />
        </FormGroup>
         <FormGroup>
        <ControlLabel>password</ControlLabel>
          <FormControl
             type="password"
             value={this.state.password}
             name="password"
             onChange={(e)=>{this.handleChange(e, this.removePasswordError);}}
             onBlur={()=>{this.validatePassword();}} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>username</ControlLabel>
            <FormControl
               type="password"
               value={this.state.passwordConfirm}
               name="passwordConfirm"
               onChange={(e)=>{this.handleChange(e, this.removePasswordError);}}
               onBlur={()=>{this.validatePassword();}} />
        </FormGroup>
        <div style={{color:'#d00'}}>{this.state.matchError}</div>
        <Button 
          type="submit"
          onSubmit={(e)=>{e.preventDefault();
                          this.validateSubmit();
                         }}>
                         Create Account
       </Button>
      </form>
    );
  }
}
