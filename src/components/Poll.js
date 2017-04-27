import React, {Component, PropTypes} from 'react';
import {Button} from 'react-bootstrap';

export default class Poll extends Component{
  constructor(props){
    super(props);
    
    this.getUserVote = this.getUserVote.bind(this);
  }
  
  getUserVote() {
    let userVote = '';
    this.props.options.forEach((option) => {
      let found = false;
      option.votes.forEach((vote) => {
        if(vote === this.props.ip) {
          userVote =  option.name;
          found = true;
          return;
        }
      });
      if (found) {return;}
    });
    return userVote;
  }
  
  render(){
    const vote = this.getUserVote(),
      optionButtons = this.props.options.map((option, index) => (
          <Button 
            key={index}
            className="option-button">
            {option.name}
            </Button>
        )),
      voteText = (
        <h4 id="voteText">
          You voted for {vote}
        </h4>
      );
    return (
      <div>
        <h3 id="name">{this.props.name}</h3>
        <h4 id="authorName">
          By{' '}<strong>{this.props._author.local.username}</strong>
        </h4>
        {
          (vote === '') ?
          optionButtons : voteText
        }
      </div>
    );
  }
}

Poll.propTypes = {
  name: PropTypes.string,
  _author: PropTypes.object,
  options: PropTypes.array,
  ip: PropTypes.string
};