import React, {Component, PropTypes} from 'react';
import Nav from '../containers/Nav';

export class App extends Component {
  render() {
      return(<div>
       <Nav />
        {this.props.children}
      </div>);
  }
}

App.propTypes = {
  children: PropTypes.element
};
