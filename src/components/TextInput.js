import {InputGroup, FormControl} from 'react-bootstrap';
import React from 'react';
export default class RemovableTextInput extends React.Component {
  constructor (props) {
    super (props);
    this.handleOnChange = this.handleOnChange.bind (this);
    var val = this.props.value?this.props.value:'';
    this.state = {
      value: val
    };
  }
  handleOnChange (e){
    var val = e.target.value;
    this.setState (()=>{
      return {value: val};
    });
    this.props.onChange (this.props.id, val);
  }
  
  render () {
    return (
      <InputGroup>
        <FormControl onChange={this.handleOnChange} value={this.state.value}/>
      </InputGroup>          
    );
  }
}