import React, {Component, PropTypes} from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

export class LoginForm extends Component {
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
    <form style={{
          position: 'absolute',
          border: '1px solid #ccc',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          padding: '10px',
          borderRadius: '3%'
        }}>
      <FormGroup controlId="username">
        <ControlLabel>Username</ControlLabel>
        <FormControl onChange={this.handleChange} value={this.state.username} name="username" type="text" placeholder="Enter your name" />
      </FormGroup>
      <FormGroup controlId="password">
        <ControlLabel>Password</ControlLabel>
        <FormControl onChange={this.handleChange} value={this.state.password} name="password" type="password" />
      </FormGroup>
      {(this.props.error && this.props.error != '')?
        <div style={{color: '#d00'}}
        className="error-label">{this.props.error}</div>
        :null
      }
      <Button
      type="submit" 
      onSubmit={(e)=> {e.preventDefault();this.props.submit(this.state);}}>Sign in</Button>
    </form>);
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func,
  error: PropTypes.string
};