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
    expect(handleChangeSpy.calledWith(e))
    handleChangeSpy.restore();
  });
  
  it('should validate password fields when one field finished editing and the other has been edited', ()=> {
    //either field is not '', and the other on finish edit
    //call validate(1st, 2nd)
    //if matching show error
    const spyValidatePassword = (SignupForm.prototype, 'validatePassword');
    const wrapper = mount(<SignupForm />);
    const controls = wrapper.find(FormControl);
    const passwordControl = controls.at(1),
          passwordConfirmControl = controls.at(2);
    
    
  });
});