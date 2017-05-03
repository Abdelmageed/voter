import React, {Component, PropTypes} from 'react';
import {Button} from 'react-bootstrap';

import Poll from '../containers/Poll';
import PollForm from '../containers/CreatePollForm';

export default class MyPolls extends Component{
  
  constructor(props){
    super(props);
    
    this.state = {
      showForm: false
    };
    
    this.closeForm = this.closeForm.bind(this);
    this.showForm = this.showForm.bind(this);
  }
  
  closeForm(){
    this.setState({
      showForm: false
    });
  }
  
  showForm(){
    this.setState({
      showForm: true
    });
  }
  
  render(){
    
    const createPollButton = (
      <Button
        id="createPollButton"
        onClick={()=> {this.showForm();}}
      >
        Create New Poll <i className="fa fa-plus" />
      </Button>
    );
    
    const pollForm = (
      <PollForm
        id="pollForm"
        close={this.closeForm}
      />
    );
    
    const userPolls = this.props.userPollIds.map((id, index) => (
      <Poll _id={id} key={index} showControls/>
    ));

    return(
      <div>
        <h1>My Polls</h1>
        { 
          (this.state.showForm)?
            pollForm : createPollButton
        }
        {userPolls}
      </div>
    ); 
  }
}

MyPolls.propTypes = {
  userPollIds: PropTypes.arrayOf(PropTypes.string),
};