import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import Poll from './Poll';
import VoteInput from './VoteInput';

describe('Poll', () => {
  let wrapper,
      ownIP = '192.168.1.1',
      pollVoted = {
        _id: 'some123aqqwe',
        name: 'A fake poll',
        options: [
          {name: 'first fake option', votes: [ownIP]},
          {name: 'second fake option', votes: []}
        ],
        _author: {
          _id: 'fakeAuthorID',
          local: {
            username: 'fake username'
          }
        }
      },
      pollNotVoted = Object.assign({}, pollVoted, {
        options: [
          {name: 'first fake option', votes: []},
          {name: 'second fake option', votes: []}
        ] 
      }),
      sandbox = sinon.sandbox.create(),
      spyGetUserVote,
      stubGetPoll;
      // spyPropVote;
  
  beforeEach(() => {
    spyGetUserVote = sandbox.spy(Poll.prototype, 'getUserVote');
    stubGetPoll = sandbox.stub(Poll.prototype, 'getPoll');
  });

  afterEach(() => {
    sandbox.restore();
  });
    
  it('should render the poll name', () => {
    wrapper = shallow(<Poll {...pollVoted} ip={ownIP}/>);    
    const name = wrapper.find('#name');
    
    expect(name).to.have.length(1);
    expect(name.text()).to.equal(pollVoted.name);
    
  });
    
  it('should render the poll author name', () => {
    wrapper = shallow(<Poll {...pollVoted} ip={ownIP}/>);    
    const authorName = wrapper.find('#authorName');
    
    expect(authorName).to.have.length(1);
    expect(authorName.text()).to.include(pollVoted._author.local.username);
  });

  it('getUserVote() should return the option user voted for if it exists', () => {
    wrapper = shallow(<Poll {...pollVoted} ip={ownIP}/>);

    wrapper.instance().getUserVote();
    expect(spyGetUserVote.returned(pollVoted.options[0].name)).to.be.true;
  });

  it('getUserVote() should return an empty string if user has not voted yet', () => {
    wrapper = shallow(<Poll {...pollNotVoted} ip={ownIP}/>);    

    wrapper.instance().getUserVote();

    expect(spyGetUserVote.returned('')).to.be.true;
  });

  it('should render a collection of buttons for every option if user has not voted yet', () => {
    wrapper = shallow(<Poll {...pollNotVoted} ip={ownIP}/>);    
    
    const optionButtons = wrapper.find('.option-button');

    expect(optionButtons).to.have.length(pollNotVoted.options.length);
  });

  it('should render the user vote if user has voted', () => {
    wrapper = shallow(<Poll {...pollVoted} ip={ownIP}/>);    
    
    const voteText = wrapper.find('#voteText');

    expect(voteText).to.have.length(1);
    expect(voteText.text()).to.include(pollVoted.options[0].name);
  });

  it('should render a div for the votes chart', () => {
    wrapper = shallow(<Poll {...pollVoted} ip={ownIP}/>);    
    
    const chart = wrapper.find('.chart');

    expect(chart).to.have.length(1);

  });

  it('vote(optionId) should call props.vote with (pollObject, optionId, props.ip)', () => {
    wrapper = shallow(<Poll {...pollVoted} ip={ownIP} vote={sinon.spy()}/>);    
    const poll = {
      _id: 'some123hade314',
      name: 'name',
      options: []
    },
    optionId = 'some123sdiq2aa';
    stubGetPoll.returns(poll);

    wrapper.instance().vote(optionId);

    expect(wrapper.instance().props.vote.calledWith(poll, optionId, ownIP)).to.be.true;
  });
  
  it('getPoll() should return the extracted poll object from props', () => {
    //getPoll is the SUT it is stubbed.
    sandbox.restore();
    //spy on it instead
    const spyGetPoll = sandbox.spy(Poll.prototype, 'getPoll')
    wrapper = shallow(<Poll {...pollVoted}/>);    
    
    wrapper.instance().getPoll();
    
    expect(spyGetPoll.returned(pollVoted)).to.be.true;
  });

  it('addNewOption(newOption) should call props.addNewOption with (poll, newOption)', () => {
     const poll = {
      _id: 'some123hade314',
      name: 'name',
      options: []
    },
    newOption = {
      _id: 'some123sdiq2aa',
      name: 'new option',
      votes: [ownIP]
    };
    stubGetPoll.returns(poll);
    wrapper = shallow(<Poll {...pollVoted} ip={ownIP} addNewOption={sinon.spy()}/>);    

    wrapper.instance().addNewOption(newOption);

    expect(wrapper.instance().props.addNewOption.calledWith(poll, newOption)).to.be.true;
  });

  it('should render a VoteInput component for authenticated users only', () => {
    wrapper = shallow(<Poll {...pollVoted} isAuthenticated={true}/>);    
    
    const voteInput = wrapper.find(VoteInput),
      loginToAddMesage = wrapper.find('#loginToAddMesage');

    expect(voteInput).to.have.length(1);
    expect(loginToAddMesage).to.have.length(0);
  });

  it('should render a "Login in order to vote for your own option" message to unauthenticated users instead of the VoteInput component', () => {
    wrapper = shallow(<Poll {...pollVoted} isAuthenticated={false}/>);    
    
    const voteInput = wrapper.find(VoteInput),
      loginToAddMesage = wrapper.find('#loginToAddMesage');

    expect(voteInput).to.have.length(0);
    expect(loginToAddMesage).to.have.length(1);
  });

});