import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import AllPolls from './AllPolls';
// import Poll from '../containers/Poll';
import PollHeader from '../containers/PollHeader';

describe('AllPolls Component', ()=> {
  
  let pollIds = [
    'someid', 'someotherid', 'someanotherid'
  ];
  let wrapper = shallow(
    <AllPolls 
      pollIds={pollIds}/>);
  
  it('should render all poll headers', ()=> {
    const headers = wrapper.find(PollHeader);

    expect(headers).to.have.lengthOf(pollIds.length);
  });
  
});