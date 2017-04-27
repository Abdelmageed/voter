import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';

import Poll from './Poll';

describe('Poll', () => {
  let wrapper,
      ownIP = '192.168.1.1',
      pollVoted = {
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
      spyGetUserVote;
  
  beforeEach(() => {
    spyGetUserVote = sandbox.spy(Poll.prototype, 'getUserVote');
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
  
});