//Reused component from Recipe Box ^_^
//http://codepen.io/Abdelmageed/pen/pNVKoz?editors=0010
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import React,{Component, PropTypes} from 'react';
export default class RemovableTextInput extends Component {
  constructor (props) {
    super (props);
    this.handleOnChange = this.handleOnChange.bind (this);
    this.handleOnClick = this.handleOnClick.bind (this);
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
  handleOnClick () {
    this.props.removeClicked (this.props.id);
  }
  render () {
    return (
      <InputGroup>
        <FormControl onChange={this.handleOnChange} value={this.state.value}/>
        <InputGroup.Button >
          <Button bsStyle="danger" onClick={this.handleOnClick}><i className="fa fa-minus" /></Button>
        </InputGroup.Button>
      </InputGroup>          
    );
  }
}

RemovableTextInput.propTypes = {
  value: PropTypes.string,
  id: PropTypes.number,
  onChange: PropTypes.func,
  removeClicked: PropTypes.func
};