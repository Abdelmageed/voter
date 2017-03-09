//TODO This class is an ugly piece of...
import React, {Component, PropTypes} from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';
import debounce from 'lodash.debounce';


export class SignupForm extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      matchError: '',
      requiredFieldsError: ''
    };
    this.matchError = "Passwords must match";
    
    this.handleChange = this.handleChange.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.removePasswordError = this.removePasswordError.bind(this);
    this.validateSubmit = this.validateSubmit.bind(this);
    this.checkUsername = this.checkUsername.bind(this);
    this.hasRequiredFieldsErrors = this.hasRequiredFieldsErrors.bind(this);
    this.hasValidationErrors = this.hasValidationErrors.bind(this);
    this.removeRequiredFieldsError = this.removeRequiredFieldsError.bind(this);
    this.checkUsernameErrors = this.checkUsernameErrors.bind(this);
    this.checkPasswordErrors = this.checkPasswordErrors.bind(this); 
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
  
  removeRequiredFieldsError(){
    if (this.state.password !== '' &&
       this.state.username !== ''){
      this.setState({
       requiredFieldsError: '' 
      });
    }
  }
  
  checkPasswordErrors(){
    this.removePasswordError();
    this.removeRequiredFieldsError();
  }
  
  checkUsernameErrors(){
    this.checkUsername();
    this.removeRequiredFieldsError();
  }
  
  hasValidationErrors(){
    return (this.state.matchError !== '' ||
    this.props.checkUsernameError !== '');
  }
  
  hasRequiredFieldsErrors(){
    return (this.state.username === '' ||
    this.state.password === '');
  }
  
  validateSubmit(){
    this.validatePassword();
    //this.checkUniqueUsername();
    
    if(this.hasRequiredFieldsErrors()){
      this.setState({
        requiredFieldsError: 'Please provide a username and a password'
      });
      return;
    }
    if (!this.hasValidationErrors()) {
      let user = {
        username: this.state.username,
        password: this.state.password
      };
      this.props.submit(user);
    }
  }
  
  checkUsername(){
    debounce(()=> {this.props.checkUsername(this.state.username);}, 400)();
  }
  
  render(){
    return (
      <form onKeyUp={(e)=>{if(e.keyCode==13) this.validateSubmit();}}
         style={{
          position: 'absolute',
          border: '1px solid #ccc',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          padding: '10px',
          borderRadius: '3%',
          width: '300%'
        }}>
        <FormGroup>
          <ControlLabel>Username</ControlLabel>
          <FormControl
             type="text"
             value={this.state.username}
             name="username"
             placeholder="Enter your name"
             onChange={(e)=>{
              this.handleChange(e, this.checkUsernameErrors);
                            }} />
        </FormGroup>
        <div style={{color:'#d00'}}
          className="username-error">
           {this.props.checkUsernameError}
        </div>
         <FormGroup>
        <ControlLabel>Password</ControlLabel>
          <FormControl
             type="password"
             value={this.state.password}
             name="password"
             onChange={(e)=>{this.handleChange(e, this.checkPasswordErrors);}}
             onBlur={()=>{this.validatePassword();}} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
               type="password"
               value={this.state.passwordConfirm}
               name="passwordConfirm"
               onChange={(e)=>{this.handleChange(e, this.removePasswordError);}}
               onBlur={()=>{this.validatePassword();}} />
        </FormGroup>
        <div style={{color:'#d00'}}>{this.state.matchError}</div>
        <div 
           style={{color:'#d00'}}
            className="required-fields-error">
            {this.state.requiredFieldsError}
            </div>
        <Button 
          onClick={()=>{this.validateSubmit();}}
          className="submit-button">
                         Create Account
       </Button>
       <a
          style={{
            cursor: 'pointer',
            color: 'inherit',
            marginLeft: '30%'   
          }}
          onClick={()=>{this.props.toggleForm();}}
          className="toggle-button"
          >
         Sign in
       </a>
      </form>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func,
  checkUsername: PropTypes.func,
  checkUsernameError: PropTypes.string,
  toggleForm: PropTypes.func
};
