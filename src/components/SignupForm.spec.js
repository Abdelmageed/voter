import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {FormControl, Button} from 'react-bootstrap';

import {SignupForm} from './SignupForm';

describe('SignupForm', ()=> {
  
  const matchError = "Passwords must match";
  
  let spyHandleChange,
      spyValidatePassword,
      spyRemovePasswordError,
      spyValidateSubmit,
      wrapper,
      controls,
      passwordControl,
      passwordConfirmControl,
      usernameControl,
      submitButton,
//      submit,
      spySubmit;
  
  beforeEach(()=> {
//    submit = (state)=> {};
    
    spySubmit = sinon.spy();
    spyHandleChange = sinon.spy(SignupForm.prototype, 'handleChange');
    spyValidatePassword = sinon.spy(SignupForm.prototype, 'validatePassword');
    spyRemovePasswordError = sinon.spy(SignupForm.prototype, 'removePasswordError');
    spyValidateSubmit = sinon.spy(SignupForm.prototype, 'validateSubmit');

    wrapper = mount(<SignupForm submit={spySubmit}/>),
    controls = wrapper.find(FormControl),
    usernameControl = controls.at(0),
    passwordControl = controls.at(1),
    passwordConfirmControl = controls.at(2),
    submitButton = wrapper.find(Button);
  });
  
  afterEach(()=> {
    spyValidatePassword.restore();
    spyRemovePasswordError.restore();
    spyHandleChange.restore();
    spyValidateSubmit.restore();
    wrapper.unmount();
  });
  
  it('has 3 inputs for username, password and, password confirmation. And 1 submit button.', ()=> {
    
    const wrapper = shallow(<SignupForm />);
    
    const inputs = wrapper.find(FormControl);
    expect(inputs.at(0).prop('name')).to.be.equal('username');
    expect(inputs.at(1).prop('name')).to.be.equal('password');
    expect(inputs.at(2).prop('name')).to.be.equal('passwordConfirm');

    const button = wrapper.find(Button);
    expect(button.length).to.equal(1);
  });
  
  it('updates state with input change', ()=> {
    
    const e = {target: usernameControl, value: 'a'};
    usernameControl.simulate('change', e);
    
    expect(spyHandleChange.called).to.be.true;
    expect(spyHandleChange.firstCall.args[0]).to.have.property('value', e.value);
  });
  
  describe('Password Controls', ()=> {
        
    describe('validatePassword()', ()=> {
    
    it('should not set state.matchError if the two fields match', ()=> {
      
    wrapper.setState({
      password: 'a',
      passwordConfirm: 'a' 
    });
    
    passwordControl.simulate('blur');
    expect(spyValidatePassword.called).to.be.true;
    expect(wrapper.state('matchError')).to.equal('');
    
    });
    
    it('should not set state.matchError if one field is clean', ()=> {
      
      wrapper.setState({
        password: 'a'
      });
      
      passwordConfirmControl.simulate('blur');
      passwordControl.simulate('blur');
      expect(wrapper.state('matchError')).to.equal('');

      wrapper.setState({
        passwordConfirm: 'a' 
      });
      
      passwordConfirmControl.simulate('blur');
      passwordControl.simulate('blur');
      expect(wrapper.state('matchError')).to.equal('');
    });
    
    it('should set state.matchError if passwords do not match', ()=> {
      
      wrapper.setState({
        password: 'a',
        passwordConfirm: 'b'
      });
      
      
      passwordControl.simulate('blur');
      expect(spyValidatePassword.called).to.be.true;
      expect(wrapper.state('matchError')).to.equal(matchError);
      
      passwordControl.simulate('blur');
      expect(spyValidatePassword.called).to.be.true;
      expect(wrapper.state('matchError')).to.equal(matchError);

    });
    
  });
  
    describe('removePasswordError()', ()=> {
      
      it('should be called onChange', ()=> {
        
        wrapper.setState({
          errors: {matchError},
          password: 'a',
          passwordConfirm: 'aa'
        });
        
        const e = {
          target: passwordControl,
          value: 'b'
        };
        
        passwordControl.simulate('change', e);
        expect(spyRemovePasswordError.called).to.be.true;
        expect(spyHandleChange.called).to.be.true;
        expect(spyHandleChange.firstCall.args[0]).to.have.property('value', e.value);

      });
      
      it('should remove match error from state, if passwords match', ()=> {
        
        wrapper.setState({
          password: 'aa',
          passwordConfirm: 'aa',
          errors: {matchError}
        });
        
        wrapper.instance().removePasswordError();
        
        expect(wrapper.state('matchError')).to.equal('');

      });
      
    });
  });
  
  describe('Submit Button', ()=> {
    
    it('calls validateSubmit on click', ()=> {
      submitButton.simulate('submit');
      expect(spyValidateSubmit.called).to.be.true;
    });
    
    it('validateSumbit() calls submit(user) if there are no validation errors', ()=> {
      
      wrapper.instance().validateSubmit();
      expect(spySubmit.called).to.be.true;
     });
    
    it('validateSumbit() should not call submit(user) if there are validation errors', ()=> {
      
      wrapper.setState({
        password: 'a',
        passwordConfirm: 'b',
        matchError: matchError
      });
      wrapper.instance().validateSubmit();
      expect(wrapper.state('matchError')).to.not.equal('');
      expect(spySubmit.called).to.be.false;
    });
    
  });
  
});