import React, {Component, PropTypes} from 'react';
import {FormGroup, FormControl, ControlLabel, Form, Button} from 'react-bootstrap';
import RemovableTextInput from './RemovableTextInput';
import TextInput from './TextInput';

export default class CreatePollForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      options: [{id: 0, name: ''}, {id: 1, name: ''}],
      optionsId: 2,
    };
    
    this.addOption = this.addOption.bind(this);
    this.setName = this.setName.bind(this);
    this.setOption = this.setOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  addOption(){
    this.setState((prevState)=> ({
      options: prevState.options.concat({
        name: '',
        id: prevState.optionsId
      }),
      optionsId: prevState.optionsId + 1  
    }));
  }
  
  deleteOption(id){
    this.setState((prevState)=> ({
      options: prevState.options.filter((option)=> option.id !== id)
    }));
  }
  
  setOption(id, value){
    this.setState((prevState)=> ({
     options: prevState.options.map((option)=> {
      if (option.id === id){
        option.name = value;
      }
       return option;
     })
    }));
  }
  
  setName(value){
    this.setState({
      name: value
    });
  }
  
  handleSubmit(){
    const newPoll = {
      _author: this.props.userId,
      name: this.state.name,
      options: this.state.options.map((option)=> ({
        id: option.id,
        name: option.name,
        votes: []
      }))
    };
    this.props.submit(newPoll);
  }
  
  render(){
    
    const optionsInputs = (this.state.options.length > 2)?
          this.state.options.map((option)=> {
          return (<RemovableTextInput
          id={option.id}
          value={option.name}
          key={option.id}
          removeClicked={this.deleteOption}
          onChange={this.setOption} />);
      }) :
          this.state.options.map((option)=> {
          return (<TextInput
          id={option.id}
          value={option.name}
          key={option.id}
          onChange={this.setOption} />);
      });
    return (
      <div id="createPollForm">
        <FormGroup id="pollName">
          <ControlLabel>Name:</ControlLabel>
          <FormControl
            type="text"
            onChange={(e)=> {this.setName(e.target.value);}}/>
        </FormGroup>
        <Form inline id="options">
         <ControlLabel>Options:</ControlLabel>
          {optionsInputs}
          <Button
          id="addOption"
          onClick={this.addOption} >
            <i className="fa fa-plus" />
          </Button>
        </Form>
        <Button
        id="saveButton"
        onClick={()=>{this.handleSubmit();}}>Save</Button>
        <Button
          id="closeButton"
          onClick={()=> {
            this.props.close();
          }}
        >
          Close
        </Button>
      </div>
    );
  }
}

CreatePollForm.propTypes = {
  userId: PropTypes.string,
  submit: PropTypes.func,
  close: PropTypes.func
};