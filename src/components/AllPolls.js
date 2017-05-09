import React, {Component, PropTypes} from 'react';
import {ListGroup} from 'react-bootstrap';

import PollHeader from '../containers/PollHeader';
import Spinner from './Spinner';

export default class AllPoll extends Component{
  
  constructor(props){
    super(props);
  }
  
  componentDidMount() {
    if(this.props.getAllPolls) {

      this.props.getAllPolls();
    }
  }

  render(){

    if(this.props.status === 'loading') {return <Spinner />;}

    const listGroupStyle = {
      width: '75%',
      margin: 'auto',
      backgrounColor: 'white',
      textAlign: 'center'
    };

    const pollHeaders = this.props.pollIds.map((id, index) => (
      <PollHeader key={index} _id={id} showAuthor />
    ));
    
    const headerStyle = {
      color: '#666'
    };


    return(
      <div className="container">
        <h1 style={headerStyle}>All Polls</h1>
        <ListGroup style={listGroupStyle}>
          {pollHeaders}
        </ListGroup>
      </div>
    ); 
  }
}

AllPoll.propTypes = {
  pollIds: PropTypes.arrayOf(PropTypes.string),
  status: PropTypes.string,
  getAllPolls: PropTypes.func,
};