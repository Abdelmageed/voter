import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import Nav from './Nav';
import CustomOverlay from './CustomOverlay';
import AuthForm from '../containers/AuthForm';
import UserDropdown from './UserDropdown';

describe('Nav', ()=> {
  
  let wrapper;
  before(()=> {
    wrapper = shallow(<Nav />);
  });
  

  it('renders the auth overlay for guests and user dropdown for authenticated users', ()=> {
    
    wrapper = shallow(<Nav authenticated={false} />);
    expect(wrapper.find(CustomOverlay).length).to.equal(1);
    expect(wrapper.find(UserDropdown).length).to.equal(0);
    
    wrapper = shallow(<Nav 
                        authenticated={true}
                        username="name"
                    />);
    expect(wrapper.find(CustomOverlay).length).to.equal(0);
    expect(wrapper.find(UserDropdown).length).to.equal(1);
    
  });
  
});