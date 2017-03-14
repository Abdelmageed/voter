import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {FormControl, ControlLabel} from 'react-bootstrap';

import RemovableTextInput from './RemovableTextInput';
import CreatePollForm from './CreatePollForm';

describe('CreatePollForm', ()=> {
  
  let wrapper,
      spySubmit = sinon.spy(),
      spyClose = sinon.spy();
  beforeEach(()=> {
    wrapper = mount(
      <CreatePollForm 
        submit={spySubmit}
        close={spyClose}
        />
    );
  });
  afterEach(()=> {
    wrapper.unmount();
  });
  
  it('should have a FormGroup for poll name with a label and a FormControl', ()=> {
    const nameFormGroup =  wrapper.find('#pollName');
    expect(nameFormGroup.length).to.equal(1);
    
    const label = nameFormGroup.find(ControlLabel);
    expect(label.length).to.equal(1);    expect(label.render().text().toLowerCase()).to.include('name');
//    
    const control = nameFormGroup.find(FormControl);
    expect(control.length).to.equal(1);
    
  });
  
  it('should have a form group for options with an add option button', ()=> {
    const group = wrapper.find('#options');
    expect(group).to.have.length(1);
    
    const addOptionButton = group.find('#addOption');
    expect(addOptionButton).to.have.length(1);
    expect(addOptionButton.find('i').hasClass('fa-plus')).to.be.true; 
  });
  
  it('add option button adds a new RemovableTextInput to the options FormGroup', ()=> {
    expect(wrapper.find(RemovableTextInput)).to.have.length(0);
    
    
    const addOptionButton = wrapper.find('#addOption');
    addOptionButton.simulate('click');
    
    expect(wrapper.find(RemovableTextInput)).to.have.length(1);
    
    addOptionButton.simulate('click');
   
    expect(wrapper.find(RemovableTextInput)).to.have.length(2);

  });
  
  it('has a save button that calls props.submit() on click with the poll object', ()=> {
    const newPoll = {
      name: 'new poll',
      options: [
        {name: 'option0', id:'0'},
        {name: 'option1', id:'1'}
      ]
    };
    wrapper.instance().state = newPoll;
//    wrapper.setState({
//      name: newPoll.name,
//      options: newPoll.options
//    }, ()=> {
    const saveButton = wrapper.find('#saveButton');
    expect(saveButton).to.have.length(1);
    saveButton.simulate('click');
    expect(spySubmit.called).to.be.true;
    
    expect(spySubmit.args[0][0]).to.deep.equal(newPoll);
    
  });
  
  it('has a cancel button that calls props.close on click', ()=> {
    const closeButton = wrapper.find('#closeButton');
    expect(closeButton).to.have.length(1);
    
    closeButton.simulate('click');
    expect(spyClose.called).to.be.true;
  });
  
  it('setName(value) sets state.name to value on name input change', ()=> {
    wrapper.instance().setName('value');
    expect(wrapper.instance().state.name).to.equal('value');
  });
  
  it('setOption(id, value) sets the option on state.options with id to value', ()=> {
    wrapper.instance().state = {
      options: [{id: 1, name: 'a7med'}]
    };
    wrapper.instance().setOption(1, '7ammo');
    expect(wrapper.instance().state.options).to.deep.equal([{id: 1, name: '7ammo'}]);
  });
  
  it('deleteOption(id) deletes the option with id from state.options', ()=> {
    wrapper.instance().state = {
      options: [{id: 0, name: 'noname'}]
    };
    wrapper.instance().deleteOption(0);
    
    expect(wrapper.instance().state.options).to.deep.equal([]);
  });
  
  it('name input sets state.name on change', ()=> {
    const nameInput = wrapper.find('#pollName').find(FormControl);
    const e  = {
      target: {
        value: 'name'
      }
    }
    nameInput.simulate('change', e);
    
    expect(wrapper.instance().state.name).to.equal('name');
  });
  
});