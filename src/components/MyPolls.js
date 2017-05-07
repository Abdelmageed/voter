import React, {Component, PropTypes} from 'react';
import {Button} from 'react-bootstrap';

import PollForm from '../containers/CreatePollForm';
import PollHeader from '../containers/PollHeader';
import Spinner from './Spinner';

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
    
    if(this.props.status === 'loading') {return <Spinner />;}


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

    const userPollsHeaders = this.props.userPollIds.map((id, index) => (
      <PollHeader _id={id} key={index} showLeadingOptions />
    ));

    return(
      <div>
        <h1>My Polls</h1>
        { 
          (this.state.showForm)?
            pollForm : createPollButton
        }
        {userPollsHeaders}
      </div>
    ); 
  }
}

MyPolls.propTypes = {
  userPollIds: PropTypes.arrayOf(PropTypes.string),
  status: PropTypes.string,
};