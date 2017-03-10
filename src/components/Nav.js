import React, {Component, PropTypes} from 'react';
import * as Bootstrap from 'react-bootstrap';
import {IndexLink} from 'react-router';

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
        <Bootstrap.Navbar.Header>
          <Bootstrap.Navbar.Brand>
            <IndexLink style={{cursor:'pointer'}} to="/">Voter</IndexLink>
          </Bootstrap.Navbar.Brand>
        </Bootstrap.Navbar.Header>
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

Nav.propTypes = {
  authenticated: PropTypes.bool,
  username: PropTypes.string,
  logout: PropTypes.func
};