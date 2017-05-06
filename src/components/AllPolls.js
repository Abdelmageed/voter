import React, {Component, PropTypes} from 'react';

import Poll from '../containers/Poll';
import PollHeader from '../containers/PollHeader';

export default class AllPoll extends Component{
  
  constructor(props){
    super(props);
  }
  
  render(){

    const pollHeaders = this.props.pollIds.map((id, index) => (
      <PollHeader _id={id} key={index} showAuthor />
    ));
    
    return(
      <div>
        <h1>Polls</h1>
        {pollHeaders}
      </div>
    ); 
  }
}

AllPoll.propTypes = {
  pollIds: PropTypes.arrayOf(PropTypes.string)
};