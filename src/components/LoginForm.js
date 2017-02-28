import React from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

export class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e){
    let val = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: val
    });
  }
  
  render(){
    return (
    <form>
      <FormGroup controlId="username">
        <ControlLabel>Username</ControlLabel>
        <FormControl onChange={this.handleChange} value={this.state.username} name="username" type="text" placeholder="Enter your name" />
      </FormGroup>
      <FormGroup controlId="password">
        <ControlLabel>Password</ControlLabel>
        <FormControl onChange={this.handleChange} value={this.state.password} name="password" type="password" />
      </FormGroup>
      <Button onClick={()=> this.props.submit(this.state)}>Sign in</Button>
    </form>);
  }
}

LoginForm.propTypes = {
  submit: React.PropTypes.func
};
