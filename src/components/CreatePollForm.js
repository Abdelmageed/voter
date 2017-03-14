import React, {Component, PropTypes} from 'react';
import {FormGroup, FormControl, ControlLabel, Form, Button} from 'react-bootstrap';
import RemovableTextInput from './RemovableTextInput';

export default class CreatePollForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      options: [],
      optionsId: 0
    };
    this.addOption = this.addOption.bind(this);
    this.setName = this.setName.bind(this);
    this.setOption = this.setOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
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
  
  render(){
    
    const optionsInput = this.state.options.map((option)=> {
          return (<RemovableTextInput
          id={option.id}
          value={option.name}
          key={option.id}
          removeClicked={this.deleteOption}
          onChange={this.setOption} />);
      });
    return (
      <Form>
        <FormGroup id="pollName">
          <ControlLabel>Name:</ControlLabel>
          <FormControl
            type="text"
            onChange={(e)=> {this.setName(e.target.value);}}/>
        </FormGroup>
        <FormGroup id="options">
          <Button
          id="addOption"
          onClick={this.addOption} >
            <i className="fa fa-plus"></i>
          </Button>
        </FormGroup>
        {optionsInput}
        <Button
        id="saveButton"
        onClick={()=>{this.props.submit(this.state);}}>Save</Button>
        <Button
          id="closeButton"
          onClick={()=> {
            this.props.close();
          }}
        >
          Close
        </Button>
      </Form>
    );
  }
}

CreatePollForm.propTypes = {
  submit: PropTypes.func,
  close: PropTypes.func
};