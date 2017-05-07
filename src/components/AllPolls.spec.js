import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';

import AllPolls from './AllPolls';
import Spinner from './Spinner';
import PollHeader from '../containers/PollHeader';

describe('AllPolls Component', () => {
  
  let pollIds = [
    'someid', 'someotherid', 'someanotherid'
  ];
  let wrapper = shallow(
    <AllPolls 
      pollIds={pollIds}
      getAllPolls={()=>{}}/>);
  
  it('should render all poll headers', () => {
    const headers = wrapper.find(PollHeader);

    expect(headers).to.have.lengthOf(pollIds.length);
  });

  it('should render a spinner if status is loading', () => {
    wrapper = shallow(<AllPolls status="loading" />);
    const spinner = wrapper.find(Spinner);

    expect(spinner).to.have.length(1);
  });
  
});