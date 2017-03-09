import React, {Component} from 'react';
import * as Bootstrap from 'react-bootstrap';

import CustomOverlay from './CustomOverlay';
import UserDropdown from './UserDropdown';
import AuthForm from '../containers/AuthForm';

export default class Nav extends Component{
  constructor(props){
    super(props);
  }
  
  render(){
      return (
        <Bootstrap.Navbar>
         <Bootstrap.Nav
           pullRight>
           {(!this.props.authenticated)?
            <CustomOverlay 
              popover={<AuthForm />}
              triggerText="Sign in"
              /> :
            <UserDropdown 
              username={this.props.username}
              logout={this.props.logout}
            />
           }
         </Bootstrap.Nav>
        </Bootstrap.Navbar>
      );
    }
}