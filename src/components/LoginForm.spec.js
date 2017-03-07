import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import {LoginForm} from './LoginForm';
import {FormGroup, Button} from 'react-bootstrap';
import sinon from 'sinon';

describe('Login Form', ()=> {
  
  it('has 2 <FormGroup/>s, one for username the other for password', ()=> {
    
    const wrapper = shallow(<LoginForm />);
    const formGroups = wrapper.find(FormGroup);
    
    expect(formGroups.length).to.be.equal(2);
  });
  
  it('submits', ()=> {
    const submit = ()=> {};
    const submitSpy = sinon.spy(submit);
    const wrapper = mount(
      <LoginForm 
      submit={submitSpy}
     />);
    const submitButton = wrapper.find(Button);
    
    expect(submitButton.length).to.be.equal(1);
    
    submitButton.simulate('click');
    expect(submitSpy.called).to.be.true;

  });
  
  it('shows error message if an error is present', ()=> {
    const error = "Wrong username or password";
    let wrapper = mount(<LoginForm error={error} />);
    
    let errorLabel = wrapper.find('.error-label');
    expect(errorLabel.length).to.equal(1);
    
    expect(errorLabel.text()).to.equal(error);
    
    wrapper = mount(<LoginForm />);
    errorLabel =wrapper.find('.error-label');
    expect(errorLabel.length).to.equal(0);

  });
});