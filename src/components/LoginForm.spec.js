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
  
  it('submits on click', ()=> {
    const submit = (name, password)=> {},
          name = 'name',
          password = 'password';
    const submitSpy = sinon.spy(submit);
    const wrapper = mount(
      <LoginForm 
      submit={submitSpy}
      name={name}
      password={password}/>);
    const submitButton = wrapper.find(Button);
    
    expect(submitButton.length).to.be.equal(1);
    
    submitButton.simulate('click');
    expect(submitSpy.called).to.be.true;
    
//    expect(submitSpy.getCall(0).args[0]).to.equal(name);
//    expect(submitSpy.getCall(0).args[1]).to.equal(password);

  });
});