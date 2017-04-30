import React, {Component, PropTypes} from 'react';

import Poll from '../containers/Poll';

export default class AllPoll extends Component{
  
  constructor(props){
    super(props);
  }
  
  render(){

    const polls = this.props.pollIds.map((id, index) => (
      <Poll _id={id} key={index}/>
    ));

    return(
      <div>
        <h1>Polls</h1>
        {polls}
      </div>
    ); 
  }
}

AllPoll.propTypes = {
  pollIds: PropTypes.arrayOf(PropTypes.string)
};