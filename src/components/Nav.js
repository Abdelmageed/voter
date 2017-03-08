import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';

import CustomOverlay from './CustomOverlay';
import UserDropdown from './UserDropdown';
import AuthForm from '../containers/AuthForm';

export default class Nav extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
      return (
        <Navbar>
         <Navbar.Text
           pullRight>
           {(!this.props.authenticated)?
            <CustomOverlay 
              popover={<AuthForm />}
              triggerText="Sign in"
              /> :
            <UserDropdown 
              username={this.props.username}
            />
           }
         </Navbar.Text>
        </Navbar>
      );
    }
}