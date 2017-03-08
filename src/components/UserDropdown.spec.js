import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import UserDropdown from './UserDropdown';

describe('UserDropdown', ()=> {
  
  const spy = sinon.spy();
  const wrapper = shallow(<UserDropdown 
  username="name"
  logout={spy} />);
  
  it('renders the username', ()=> {
    
    expect(wrapper.prop('title')).to.equal('name');
    
  });
  
  it('calls logout() on logout link menu item click', ()=> {
    const logoutLink = wrapper.find('.logout-link');
    expect(logoutLink.length).to.equal(1);
    
    logoutLink.simulate('click');
    expect(spy.called).to.be.true;
  });
  
});