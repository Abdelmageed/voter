import {shallow, mount} from 'enzyme';
import sinon from 'sinon';
import {expect} from 'chai';
import React from 'react';
import {Overlay, Button} from 'react-bootstrap';
import CustomOverlay from './CustomOverlay';
import {LoginForm} from './LoginForm';

describe('Custom Overlay', ()=> {
  
  it('should have a trigger button and an Overlay component', ()=> {
    const wrapper = shallow(<CustomOverlay />);
    
    const triggerButton = wrapper.find(Button);
    expect(triggerButton.length).to.equal(1);
    
    const overlay = wrapper.find(Overlay);
    expect(overlay.length).to.equal(1);
    
    
  });
  
  it('should toggle showing overlay on button click', ()=> {
    const wrapper = shallow(<CustomOverlay />);
    
    const triggerButton = wrapper.find(Button);
    const spyToggle = sinon.spy(wrapper.instance(), 'toggle');
    
    triggerButton.simulate('click');
    expect(spyToggle.called).to.be.true;
  });
  
  it('should render the passed triggerText on trigger button', ()=> {
    const triggerText = 'Login';
    const wrapper = mount(<CustomOverlay triggerText={triggerText}/>);
    const triggerButton = wrapper.find(Button);
    
    expect(triggerButton.text()).to.equal(triggerText);
  });
  
  it('should have the passed popover inside the Overlay', ()=> {
    
    const wrapper = shallow(<CustomOverlay 
    popover={<LoginForm />} />);
    
    const form = wrapper.find(Overlay).find(LoginForm);
    
    expect(form.length).to.equal(1);
    
  });
});