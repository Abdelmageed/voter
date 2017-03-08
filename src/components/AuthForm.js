import React, {Component, PropTypes} from 'react';
import {LoginForm} from './LoginForm';
import {SignupForm} from './SignupForm';

export default class AuthForm extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      activeForm: 'login'
    };
    
    this.toggleActiveForm = this.toggleActiveForm.bind(this);
  }
  
  toggleActiveForm(){
    this.setState((prevState)=> {
      return {
        activeForm: prevState.activeForm === 'login'? 'signup' : 'login'
      };
    });
  }
  
  render(){
    
    const loginForm = (
      <LoginForm
          error={this.props.loginError}
          submit={this.props.loginSubmit}
          toggleForm={this.toggleActiveForm}/>
    ),
          signupForm = (
            <SignupForm 
            submit={this.props.signupSubmit}
            checkUsername={this.props.checkUsername}
            checkUsernameError={this.props.checkUsernameError}
            toggleForm={this.toggleActiveForm}/>
          );
    
    return (this.state.activeForm === 'login')?loginForm : signupForm;

  }
}

AuthForm.propTypes = {
  loginError: PropTypes.string,
  checkUsernameError: PropTypes.string,
  loginSubmit: PropTypes.func,
  signupSubmit: PropTypes.func,
  checkUsername: PropTypes.func
};