import React, {Component, PropTypes} from 'react';

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
  pollIds: PropTypes.arrayOf(PropTypes.string),
  status: PropTypes.string,
  getAllPolls: PropTypes.func,
};