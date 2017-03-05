import React from 'react';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {FormControl, Button} from 'react-bootstrap';

import {SignupForm} from './SignupForm';

describe('SignupForm', ()=> {
  
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
    
    const handleChangeSpy = sinon.spy(SignupForm.prototype, 'handleChange');
    const wrapper = mount(<SignupForm />);
    const state = wrapper.instance().state;
    
    const username = state.username;
    expect(username).to.equal('');
    const usernameControl = wrapper.find(FormControl).at(0);
    const e = {target: usernameControl, value: 'a'};
    usernameControl.simulate('change', e);
    
    expect(handleChangeSpy.called).to.be.true;
    expect(handleChangeSpy.calledWith(e));
    handleChangeSpy.restore();
  });
  
  describe('validatePassword()', ()=> {
    
    const matchError = "Passwords must match";
    
    let spyValidatePassword,
        wrapper,
        controls,
        passwordControl,
        passwordConfirmControl;
    
    beforeEach(()=> {
      spyValidatePassword = sinon.spy(SignupForm.prototype, 'validatePassword');
      wrapper = mount(<SignupForm />),
      controls = wrapper.find(FormControl),
      passwordControl = controls.at(1),
      passwordConfirmControl = controls.at(2);
    });
    
    afterEach(()=> {
      spyValidatePassword.restore();
      wrapper.unmount();
    });
    
    it('should not add match error to state.errors when one field is blurred and the other has been edited', ()=> {
      
    wrapper.setState({
      password: 'a',
      passwordConfirm: 'a' 
    });
    
    
    passwordControl.simulate('blur');
    expect(spyValidatePassword.called).to.be.true;
    expect(wrapper.state('errors')).to.not.include(matchError);

    
    });
    
    it('should not add match error to state.errors if one field is clean', ()=> {
      
      wrapper.setState({
        password: 'a'
      });
      
      passwordConfirmControl.simulate('blur');
      passwordControl.simulate('blur');
      expect(wrapper.state('errors')).to.not.include(matchError);

      
      wrapper.setState({
        passwordConfirm: 'a' 
      });
      
      passwordConfirmControl.simulate('blur');
      passwordControl.simulate('blur');
      expect(wrapper.state('errors')).to.not.include(matchError);
    });
    
    it('should add match error to state.errors if passwords do not match', ()=> {
      
      wrapper.setState({
        password: 'a',
        passwordConfirm: 'b'
      });
      
      
      passwordControl.simulate('blur');
      expect(spyValidatePassword.called).to.be.true;
      expect(wrapper.state('errors')).to.include(matchError);
      
      passwordControl.simulate('blur');
      expect(spyValidatePassword.called).to.be.true;
      expect(wrapper.state('errors')).to.include(matchError);

    });
    
    //should be another method's and called onChange not onBlur
//    it('should remove "Password must match" from state.errors if passwords match', ()=> {
//      wrapper.setState({
//        errors: [matchError],
//        password: 'aa',
//        passwordConfirm: 'aa'
//      });
      
//    });
    
  });
  
});