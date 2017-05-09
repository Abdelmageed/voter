import React, {Component, PropTypes} from 'react';
import {FormGroup, ControlLabel, Form, Button} from 'react-bootstrap';
import RemovableTextInput from './RemovableTextInput';
import RequiredTextInput from './RequiredTextInput';

export default class PollForm extends Component{
  constructor(props){
    super(props);
    this.state = this.getState();

    //a non-state variable for storing children input validation states
    //it's outside of state so as not to re-render the whole form on changing an entry
    this.inputValidations = {
      pollName: false,
      '0': false,
      '1': false
    };

    //initial poll to revert to in case of server error
    this.initialPoll = this.props.poll ? this.props.poll : {};

    //incremented when a child input finishes validating
    this.validateCount = 0;
    
    this.addOption = this.addOption.bind(this);
    this.setName = this.setName.bind(this);
    this.setOption = this.setOption.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.areAllValid = this.areAllValid.bind(this);
    this.validate = this.validate.bind(this);
    this.getState = this.getState.bind(this);
  }
  
  getState() {
    const newInitialState = {
      name: '',
      options: [{id: '0', name: '', votes: []}, {id: '1', name: '', votes: []}],
      optionsId: 2,
      validating: false,
    };
    if(this.props.poll) {

      this.inputValidations = {
        pollName: false
      };
      this.props.poll.options.forEach((option, index) => {
        this.inputValidations[index] = false;
      });
      
      return Object.assign({}, newInitialState, {
        options: this.props.poll.options.map((option, index) => {
          return Object.assign({}, option, {id: index.toString()});
      }), name: this.props.poll.name});
    } else {
      return newInitialState;
    }
  }

  addOption(){
    this.inputValidations[this.state.optionsId] = false;
    this.setState((prevState)=> ({
      options: prevState.options.concat({
        name: '',
        id: prevState.optionsId.toString(),
        votes: []
      }),
      optionsId: prevState.optionsId + 1  
    }));
  }
  
  deleteOption(id){
    delete this.inputValidations[id];
    this.setState((prevState)=> ({
      options: prevState.options.filter((option)=> option.id !== id)
    }));
  }
  
  validate(e) {
    e.preventDefault();

    this.setState({
      validating: true
    });
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
  
  setName(id, value){
    this.setState({
      name: value
    });
  }

  validateForm(inputId, isValid) {
    this.inputValidations[inputId] = isValid;
    this.validateCount++;
    if(this.validateCount === Object.keys(this.inputValidations).length) {
      //all inputs have finished validation
      this.setState({
        validating: false
      });
      this.validateCount = 0;

      if(this.areAllValid()) {
        this.handleSubmit();
      }
    }
  }

  areAllValid() {
    for (let id in this.inputValidations) {
      if (!this.inputValidations[id]) {
        return false;
      }
    }
    return true;
  }
  
  handleSubmit(){
    const newPoll = {
      name: this.state.name,
      options: this.state.options,
      _author: (this.props.poll)? this.props.poll._author : this.props.userId
    };
    this.props.submit(newPoll, this.initialPoll);
    this.props.close();
  }
  
  render(){
    
    const style = {
      width: '75%',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '20px',
      boxShadow: '2px 2px 2px 2px #999',
      padding: '5px',
      border: '1px solid #999',
      borderRadius: '1.5%',
      textAlign: 'left',
    };

    const optionsInputs = (this.state.options.length > 2)?
          this.state.options.map((option)=> {
          return (<RemovableTextInput
            id={option.id}
            value={option.name}
            key={parseInt(option.id)}
            removeClicked={this.deleteOption}
            onChange={this.setOption}
            validateForm={this.validateForm}
            errorMessage="Can't be empty"
            validating={this.state.validating}/>);
      }) :
          this.state.options.map((option)=> {
          return (<RequiredTextInput
            id={option.id}
            value={option.name}
            key={parseInt(option.id)}
            onChange={this.setOption} 
            validateForm={this.validateForm}
            errorMessage="Can't be empty"
            validating={this.state.validating}/>);
      });
    return (
      <form 
        id="PollForm"
        style={style}
        onSubmit={this.validate}>
        <Button
          id="closeButton"
          className="close"
          style={{marginLeft: '90%'}}
          onClick={()=> {
            this.props.close();
          }}
        >
          <i className="fa fa-times fa-2x" style={{color: 'red'}}/>
        </Button>
        <br />
        <FormGroup id="pollNameGroup">
          <ControlLabel>Name:</ControlLabel>
          <RequiredTextInput 
            id="pollName"
            value={this.state.name}
            onChange={this.setName}
            validateForm={this.validateForm}
            validating={this.state.validating}
            errorMessage="Can't be empty"/>
        </FormGroup>
        <FormGroup id="options">
         <ControlLabel>Options:</ControlLabel>
          {optionsInputs}
          <Button
          id="addOption"
          onClick={this.addOption} >
            <i className="fa fa-plus" /> Add Option
          </Button>
        </FormGroup>
        <hr />
        <Button
          bsStyle="success"
          id="saveButton"
          type="submit"
        >Save</Button>
      </form>
    );
  }
}

PollForm.propTypes = {
  userId: PropTypes.string,
  username: PropTypes.string,
  submit: PropTypes.func,
  close: PropTypes.func,
  poll: PropTypes.object
};