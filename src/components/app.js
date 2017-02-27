import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../index'
export class App extends React.Component {
  render() {
      return(<div>
        {this.props.children}
      </div>);
  }
}
