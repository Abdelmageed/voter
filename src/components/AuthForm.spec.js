import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import AuthForm from './AuthForm';
import {SignupForm} from './SignupForm';
import {LoginForm} from './LoginForm';

describe('AuthForm', ()=> {
  
  let wrapper;
  beforeEach(()=> {
    wrapper = shallow(
        <AuthForm store={{}}/>
      );
  });
  
  afterEach(()=> {
    wrapper.unmount();
  });
  
  it('should render either a signup form or a login form based on state', ()=> {
    
      expect(wrapper.find(LoginForm).length).to.equal(1);
      expect(wrapper.find(SignupForm).length).to.equal(0);

      wrapper.setState({
        activeForm: 'signup'
      });
      expect(wrapper.find(SignupForm).length).to.equal(1);
      expect(wrapper.find(LoginForm).length).to.equal(0);
    
  });
  
  it('toggleActiveForm() toggles signup/login forms', ()=> {
    
    expect(wrapper.state('activeForm')).to.equal('login');
    wrapper.instance().toggleActiveForm();
    expect(wrapper.state('activeForm')).to.equal('signup');
  });
  
});