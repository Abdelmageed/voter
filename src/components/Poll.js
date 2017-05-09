import React, {Component, PropTypes} from 'react';
import {Button} from 'react-bootstrap';
import {Pie} from 'react-chartjs-2';
import color from '../util/colors';
import {Share} from 'react-twitter-widgets';

import VoteInput from './VoteInput';
import PollForm from '../containers/EditPollForm';
import DeletePopover from '../containers/DeletePopover';
import PollTitle from './PollTitle';
import Spinner from './Spinner';

export default class Poll extends Component{
  constructor(props){
    super(props);
    
    this.getUserVote = this.getUserVote.bind(this);
    this.vote = this.vote.bind(this);
    this.getPoll = this.getPoll.bind(this);
    this.addNewOption = this.addNewOption.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
    this.hideEditForm = this.hideEditForm.bind(this);
    this.showDeletePopover = this.showDeletePopover.bind(this);
    this.hideDeletePopover = this.hideDeletePopover.bind(this);

    this.state = {
      editing: false,
      showDeletePopover: false
    };

    this.identifier = this.props.userId || this.props.ip;
  }

  componentdidMount () {
    this.props.getPoll(this.props.params._id);
  }
  
  getUserVote() {
    let userVote = '';
    this.props.options.forEach((option) => {
      let found = false;
      option.votes.forEach((vote) => {
        if(vote === this.identifier) {
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
            _id: this.props.params._id,
            options: this.props.options,
            _author: this.props._author,
            name: this.props.name
        };
  }

  vote(optionId) {
    const poll = this.getPoll();
    this.props.vote(poll, optionId, this.identifier);
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

  showDeletePopover() {
    this.setState({
      showDeletePopover: true
    });
  }

   hideDeletePopover() {
      this.setState({
        showDeletePopover: false
      });
    }

  render(){

    if(this.props.status === 'loading') {return <Spinner />;}

    this.identifier = this.props.userId || this.props.ip;    

    const colors = color(this.props.options.length);

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

    const userVote = this.getUserVote(),
      optionButtons = this.props.options.map((option, index) => (
          <div key={index}>
            <Button 
              className="option-button"
              onClick={()=> {this.vote(option._id);}}>
              {option.name}
            </Button>
          </div>
        )),
      voteText = (
        <h4 id="voteText">
          You voted for {userVote}
        </h4>
      );

      const voteInput = (
        <VoteInput 
          key={optionButtons.length}
          identifier={this.identifier}
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

      const style = {
        width: 440,
        margin: 'auto',
        border: '1px solid #999',
        borderRadius: '1.5%',
        backgroundColor: 'white',
        boxShadow: '0px 2px 1px 2px #999', 
        padding: 20,
      };

      const controlsStyle = {
        width: '80%',
        marginTop: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
      };

      const chartStyle = {
        width: 400,
        marginBottom: '10px',
      };

      const socialWidgets = (
        <span id="socialWidgets">
            <Share 
              url={window.location.href}
              options={{text: `Your vote counts on ${this.props.name}`, size: 'large'}} />
        </span>
      );

      

      const pollAuthorControls = (
        <span id="pollAuthorControls" style={controlsStyle}>
          <Button bsStyle="warning" onClick={this.showEditForm}>
            <i className="fa fa-edit" /> Edit
          </Button>
          <Button bsStyle="danger" onClick={this.showDeletePopover} style={{float: 'right'}}>
            <i className="fa fa-trash"/> Delete
          </Button>
          <DeletePopover show={this.state.showDeletePopover} hide={this.hideDeletePopover} id={this.props.params._id}/>
        </span>
      );


      const isOwnPoll = (this.props.userId === this.props._author._id);

      

      const poll = (
        <div style={style}>
          <PollTitle 
            authorName={this.props._author.local.username}
            pollName={this.props.name}
            size="lg"
            showAuthor
            isOwnPoll={isOwnPoll}/>        
          {
            (userVote === '') ?
            optionButtons : voteText
          }
          <div
            className="chart" 
            style={chartStyle}
          >
            <Pie
              data={data}
              />
          </div>
          {isOwnPoll ? socialWidgets : null}
          {isOwnPoll ? pollAuthorControls : null}
        </div>
      );

      const pollForm = (
        <PollForm 
          poll={this.getPoll()}
          close={this.hideEditForm}
        />
      );

    return (
      <div className="container">
        {this.state.editing ? pollForm : poll};
      </div>
    );
  }
}

Poll.propTypes = {
  name: PropTypes.string,
  _author: PropTypes.object,
  options: PropTypes.array,
  ip: PropTypes.string,
  params: PropTypes.object,
  vote: PropTypes.func,
  addNewOption: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  showAuthor: PropTypes.bool,
  userId: PropTypes.string,
  showControls: PropTypes.bool,
  status: PropTypes.string,
  getPoll: PropTypes.func,
};