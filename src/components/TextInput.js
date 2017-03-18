import {InputGroup, FormControl} from 'react-bootstrap';
import React, {Component, PropTypes} from 'react';
export default class RemovableTextInput extends Component {
  constructor (props) {
    super (props);
    this.handleOnChange = this.handleOnChange.bind (this);
    const val = this.props.value?this.props.value:'';
    this.state = {
      value: val
    };
  }
  handleOnChange (e){
    const val = e.target.value;
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

RemovableTextInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.number
};