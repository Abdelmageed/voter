import React, {Component} from 'react';
//import CreatePollForm from './CreatePollForm';
import CreatePollForm from '../Containers/CreatePollForm';
import {Form} from 'react-bootstrap';
export default class MyPolls extends Component{
  
  render(){
    return(
      <div>
        <h1>My Polls</h1>
        < CreatePollForm />
      </div>
    ); 
  }
}