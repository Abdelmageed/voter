import React, {Component, PropTypes} from 'react';
//import {LoginForm} from './LoginForm';
import LoginForm from '../containers/LoginForm';
import CustomOverlay from './CustomOverlay';

export class App extends Component {
  render() {
      return(<div>
         <CustomOverlay 
         triggerText="Login"
         popover={<LoginForm />} 
         />
        {this.props.children}
      </div>);
  }
}

App.propTypes = {
  children: PropTypes.array
};
