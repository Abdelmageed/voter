import React, {Component, PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import {Pie} from 'react-chartjs-2';
import randomcolor from 'randomcolor';

import VoteInput from './VoteInput';
import PollForm from '../containers/EditPollForm';

export default class Poll extends Component{
  constructor(props){
    super(props);
    
    this.getUserVote = this.getUserVote.bind(this);
    this.vote = this.vote.bind(this);
    this.getPoll = this.getPoll.bind(this);
    this.addNewOption = this.addNewOption.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
    this.hideEditForm = this.hideEditForm.bind(this);

    this.state = {
      editing: false
    };
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

  getPoll() {
    return {
            _id: this.props._id,
            options: this.props.options,
            _author: this.props._author,
            name: this.props.name
        };
  }

  vote(optionId) {
    const poll = this.getPoll();
    this.props.vote(poll, optionId, this.props.ip);
  }
  
  addNewOption(newOption) {
    const poll = this.getPoll();
    this.props.addNewOption(poll, newOption);
  }

  showEditForm() {
    this.setState({
      editing: true
    });
  }

  hideEditForm() {
    this.setState({
      editing: false
    });
  }

  render(){

    const colors = randomcolor({count: this.props.options.length});

    const data = {
    labels: this.props.options.map((option) => {
      return option.name;
    }),
    datasets: [
        {
            data: this.props.options.map((option) => {
              return option.votes.length;
            }),
            backgroundColor: colors,
            hoverBackgroundColor: colors
        }]
  };

    const vote = this.getUserVote(),
      optionButtons = this.props.options.map((option, index) => (
          <Button 
            key={index}
            className="option-button"
            onClick={()=> {this.vote(option._id);}}>
            {option.name}
            </Button>
        )),
      voteText = (
        <h4 id="voteText">
          You voted for {vote}
        </h4>
      );

      const voteInput = (
        <VoteInput 
          key={optionButtons.length}
          ip={this.props.ip}
          addNewOption={this.addNewOption}
          />),
        loginToAddMessage = (
          <h4 
            id="loginToAddMesage"
            key={optionButtons.length}
            >
            Login in order to vote for your own option
          </h4>
        ),
        addVoteOrMessage = (this.props.isAuthenticated) ? voteInput : loginToAddMessage;
      
      optionButtons.push(
        addVoteOrMessage
      );

      const authorName = (this.props.userId === this.props._author._id) ? 
        'You' : this.props._author.local.username;

      const authorNameHeading = (
        <h4 id="authorName">
          By{' '}<strong>{authorName}</strong>
        </h4>
      );

      const pollAuthorControls = (
        <div id="pollAuthorControls">
          <Button onClick={this.showEditForm}>Edit</Button>
        </div>
      );

      const poll = (
        <div>
          {this.props.showControls ? pollAuthorControls : null}
        <h3 id="name">{this.props.name}</h3>
        {
          (this.props.showAuthor) ?
            authorNameHeading : null
        }        
        {
          (vote === '') ?
          optionButtons : voteText
        }
        <div
          className="chart" 
          style={{
            width: 400,
            height: 400
          }}
        >
          <Pie
            data={data}
            />
        </div>
      </div>
      );

      const pollForm = (
        <PollForm 
          poll={this.getPoll()}
          close={this.hideEditForm}
        />
      );

    return this.state.editing ? pollForm : poll;
  }
}

Poll.propTypes = {
  name: PropTypes.string,
  _author: PropTypes.object,
  options: PropTypes.array,
  ip: PropTypes.string,
  _id: PropTypes.string,
  vote: PropTypes.func,
  addNewOption: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  showAuthor: PropTypes.bool,
  userId: PropTypes.string,
  showControls: PropTypes.bool,
};