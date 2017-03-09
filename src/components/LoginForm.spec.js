import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import {LoginForm} from './LoginForm';
import {FormGroup, Button, FormControl} from 'react-bootstrap';
import sinon from 'sinon';

describe('Login Form', ()=> {
  
  it('has 2 <FormGroup/>s, one for username the other for password', ()=> {
    
    const wrapper = shallow(<LoginForm />);
    const formGroups = wrapper.find(FormGroup);
    
    expect(formGroups.length).to.be.equal(2);
  });
  
  it('has a "Create Account" button which toggles the signup form', ()=> {
    const spy = sinon.spy();
    const wrapper = shallow(<LoginForm toggleForm={spy} />);
    const toggleButton = wrapper.find('.toggle-button');
    expect(toggleButton.length).to.equal(1);
  
    toggleButton.simulate('click');
    expect(spy.called).to.be.true;
  });
  
  describe('Form Submission', ()=> {
    
    let submit,
        spySubmit,
        spyValidateSubmit,
        wrapper,
        submitButton;
    
    beforeEach(()=> {
     submit = ()=> {};
     spySubmit = sinon.spy(submit);
     spyValidateSubmit = sinon.spy(LoginForm.prototype, 'validateSubmit');
     wrapper = mount(
      <LoginForm 
      submit={spySubmit}
     />);
     submitButton = wrapper.find('.login-button');
      
    });
    
    afterEach(()=> {
      wrapper.unmount();
      spyValidateSubmit.restore();

    });
    
    it('submits the user credentials only if both the username and password are provided', ()=> {
    
    
    expect(submitButton.length).to.be.equal(1);
    
    submitButton.simulate('click');
    expect(spyValidateSubmit.called).to.be.true;
    expect(spySubmit.called).to.be.false;
    
    wrapper.setState({
      username: 'name',
      password: 'password'
    }, ()=> {
      wrapper.instance().removeRequiredFieldsError();
    });
    
    submitButton.simulate('click');
    expect(spyValidateSubmit.called).to.be.true;
    setTimeout(()=> {
      expect(spySubmit.called).to.be.true;
    }, 10);
    
  });
  
  it('shows an error message if username or password are missing on submit', ()=> {
    
    //username and password are initially ''
    submitButton.simulate('click');
    let requiredFieldsError = wrapper.find('.required-fields-error');
    expect(requiredFieldsError.length).to.equal(1);
    
    wrapper.setState({
      username: 'name',
      password: 'password'
    });
    wrapper.instance().removeRequiredFieldsError();
    
    submitButton.simulate('click');
    requiredFieldsError = wrapper.find('.required-fields-error');
    expect(requiredFieldsError.length).to.equal(0);
    
  });
    
  });
  
  
  
  it('shows an error message on submitting invalid credentials', ()=> {
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