import React, {Component, PropTypes} from 'react';
import {Button, ListGroup} from 'react-bootstrap';

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

    this.createButton = null;
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

    const containerStyle = {
      textAlign: 'center'
    };

    const createButtonStyle = {
      marginBottom: 10,
    };

    const createPollButton = (
      <Button
        ref={ref => {this.createButton = ref;}}
        style={createButtonStyle}
        bsStyle="primary"
        id="createPollButton"
        onClick={()=> {this.showForm();}}
      >
       <h4><i className="fa fa-plus" /> Create New Poll</h4>
      </Button>
    );
    
    const pollForm = (
      <PollForm
        id="pollForm"
        close={this.closeForm}
      />
    );

    const listGroupStyle = {
      width: '75%',
      margin: 'auto',
      backgrounColor: 'white',
    };

    const headerStyle = {
      color: '#666'
    };

    const userPollsHeaders = this.props.userPollIds.map((id, index) => (
      <PollHeader key={index} _id={id}  showLeadingOptions />
    ));


    return(
      <div className="container">
        <h1 style={headerStyle}>My Polls</h1>
        <div style={containerStyle}>
          { 
            (this.state.showForm)?
              pollForm : createPollButton
          }
          <ListGroup style={listGroupStyle}>
            {userPollsHeaders}
          </ListGroup>
        </div>
      </div>
    ); 
  }
}

MyPolls.propTypes = {
  userPollIds: PropTypes.arrayOf(PropTypes.string),
  status: PropTypes.string,
};