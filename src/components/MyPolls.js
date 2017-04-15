import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
//import CreatePollForm from './CreatePollForm';
import CreatePollForm from '../containers/CreatePollForm';
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
        Create New Poll <i className="fa fa-plus"></i>
      </Button>
    );
    
    const createPollForm = (
      <CreatePollForm
        id="createPollForm"
        close={this.closeForm}
      />
    )
    
    return(
      <div>
        <h1>My Polls</h1>
        { 
        (this.state.showForm)?
          createPollForm : createPollButton
        
        }
      </div>
    ); 
  }
}