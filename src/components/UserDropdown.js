import React, {Component, PropTypes} from 'react';
import {NavDropdown, MenuItem} from 'react-bootstrap';

export default class UserDropdown extends Component {
  
  constructor(props){
    super(props);
  }
  
  render(){ 
    return(
      <NavDropdown 
       title={this.props.username}
       id="userDropdown">
        <MenuItem>My Polls</MenuItem>
        <MenuItem divider />
        <MenuItem 
          className="logout-link"
          onClick={this.props.logout}>Logout</MenuItem>
      </NavDropdown>
    );
  }
}

UserDropdown.propTypes = {
  logout: PropTypes.func,
  username: PropTypes.string
};