import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import AllPolls from './AllPolls';
import Poll from '../containers/Poll';

describe('AllPolls Component', ()=> {
  
  let pollIds = [
    'someid', 'someotherid', 'someanotherid'
  ];
  let wrapper = shallow(
    <AllPolls 
      pollIds={pollIds}/>);
  
  it('should render all polls', ()=> {
    const polls = wrapper.find(Poll);

    expect(polls).to.have.lengthOf(pollIds.length);
  });
  
});