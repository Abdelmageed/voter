import React, {Component, PropTypes} from 'react';
//import {LoginForm} from './LoginForm';
import LoginForm from '../containers/LoginForm';

export class App extends Component {
  render() {
      return(<div>
         <LoginForm />
        {this.props.children}
      </div>);
  }
}

App.propTypes = {
  children: PropTypes.array
};
