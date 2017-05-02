import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {FormControl, ControlLabel} from 'react-bootstrap';

import RemovableTextInput from './RemovableTextInput';
import RequiredTextInput from './RequiredTextInput';
import CreatePollForm from './CreatePollForm';

describe('CreatePollForm', () => {
  
  let wrapper,
      spySubmit = sinon.spy(),
      spyClose = sinon.spy(),
      sandbox = sinon.sandbox.create(),
      spyAreAllValid,
      spyValidate,
      spyHandleSubmit,
      userId = '123',
      username = 'username';
  beforeEach(() => {
    spyAreAllValid = sandbox.spy(CreatePollForm.prototype, 'areAllValid');
    spyHandleSubmit = sandbox.spy(CreatePollForm.prototype, 'handleSubmit');
    spyValidate = sandbox.spy(CreatePollForm.prototype, 'validate');
    wrapper = mount(
      <CreatePollForm 
        submit={spySubmit}
        close={spyClose}
        userId={userId}
        username={username}
        />
    );
  });
  afterEach(() => {
    wrapper.unmount();
    sandbox.restore();
  });
  
  it('should have a FormGroup for poll name with a label and a FormControl', () => {
    const nameFormGroup =  wrapper.find('#pollNameGroup');
    expect(nameFormGroup.length).to.equal(1);
    
    const label = nameFormGroup.find(ControlLabel);
    expect(label.length).to.equal(1);    expect(label.render().text().toLowerCase()).to.include('name');
    
    const control = nameFormGroup.find(FormControl);
    expect(control.length).to.equal(1);
    
  });
  
  it('should have a form group for options with an add option button', () => {
    const group = wrapper.find('#options');
    expect(group).to.have.length(1);
    
    const addOptionButton = group.find('#addOption');
    expect(addOptionButton).to.have.length(1);
    expect(addOptionButton.find('i').hasClass('fa-plus')).to.be.true; 
  });
  
  it('should have 2 non-removable RequiredTextInput-s for the minimum of 2 options', () => {
    const optionsFormGroup = wrapper.find('#options');
    expect(optionsFormGroup.find(RequiredTextInput)).to.have.length(2);
  });
  
  it('should render option inputs as RemovableTextinput-s if they are greater than 2', () => {
    const optionsFormGroup = wrapper.find('#options');
    wrapper.instance().addOption();
    
    expect(optionsFormGroup.find(RemovableTextInput)).to.have.length(3);
  });
 
  it('should render option inputs as RequiredTextInput-s if they are equal to 2', () => {
    const optionsFormGroup = wrapper.find('#options');
    wrapper.instance().addOption();
    wrapper.instance().deleteOption('0');
    
    expect(optionsFormGroup.find(RequiredTextInput)).to.have.length(2);

  });
  
  it('add option button adds a new input to the options FormGroup', () => {
    const optionsFormGroup = wrapper.find('#options');  expect(optionsFormGroup.find(FormControl)).to.have.length(2);
    
    const addOptionButton = wrapper.find('#addOption');
    addOptionButton.simulate('click');
    
    expect(optionsFormGroup.find(FormControl)).to.have.length(3);
    
    addOptionButton.simulate('click');
   
    expect(optionsFormGroup.find(FormControl)).to.have.length(4);

  });
  
  it('handleSubmit() calls props.submit() and props.close()', () => {
    const newPoll = {
      name: 'new poll',
      options: [
        {name: 'option0', id:'0'},
        {name: 'option1', id:'1'}
      ]
    };
    wrapper.instance().state = newPoll;
    
    const newSavedPoll = Object.assign({}, newPoll, {
      options: [
        {name: 'option0', id:'0', votes:[]},
        {name: 'option1', id:'1', votes:[]}
      ]});

    wrapper.instance().handleSubmit();

    expect(spySubmit.called).to.be.true;
    expect(spySubmit.args[0][0]).to.deep.equal(newSavedPoll);
    expect(spySubmit.args[0][1]).to.deep.equal({_id: userId, local: {username: username}});
    expect(spyClose.called).to.be.true;
  });

  it('has a save button that calls validate() on click', () => {
    const saveButton = wrapper.find('#saveButton');
    expect(saveButton).to.have.length(1);
    saveButton.simulate('click');

    expect(spyValidate.called).to.be.true;
  });
  
  it('has a cancel button that calls props.close on click', () => {
    const closeButton = wrapper.find('#closeButton');
    expect(closeButton).to.have.length(1);
    
    closeButton.simulate('click');
    expect(spyClose.called).to.be.true;
  });
  
  it('setName(id, value) sets state.name to value on name input change', () => {
    wrapper.instance().setName('pollName', 'value');
    expect(wrapper.instance().state.name).to.equal('value');
  });
  
  it('setOption(id, value) sets the option on state.options with id to value', () => {
    wrapper.instance().state = {
      options: [{id: 1, name: 'a7med'}]
    };
    wrapper.instance().setOption(1, '7ammo');
    expect(wrapper.instance().state.options).to.deep.equal([{id: 1, name: '7ammo'}]);
  });
  
  it('deleteOption(id) deletes the option with id from state.options', () => {
    wrapper.instance().state = {
      options: [{id: 0, name: 'noname'}]
    };
    wrapper.instance().deleteOption(0);
    
    expect(wrapper.instance().state.options).to.deep.equal([]);
  });
  
  it('validateForm(inputId, isValid) should update inputValidations entry matching (inputId) with (isValid)', () => {
    wrapper.instance().validateForm('name', true);

    expect(wrapper.instance().inputValidations['name']).to.equal(true);
  });


  it('validateForm(inputId, isValid) should call handleSubmit if validateCount is equal to the number of children inputs i.e (when the last child has finished validating) and all inputs are valid', () => {
     spyAreAllValid.restore();
     wrapper.unmount();
     const stubAreAllValid = sandbox.stub(CreatePollForm.prototype, 'areAllValid');
     stubAreAllValid.returns(true);
     
     wrapper = mount(
      <CreatePollForm 
        submit={spySubmit}
        close={spyClose}
        userId={userId}
        username={username}
        />
    );
     wrapper.instance().inputValidations = {
      firstInput: false,
      secondInput: true,
      thirdInput: true
    };
    wrapper.instance().validateCount = 2;

    wrapper.instance().validateForm('firstInput', true);

    expect(spyHandleSubmit.called).to.be.true;
  });

  it('areAllValid() should return true if all inputValidations are true', () => {
    wrapper.instance().inputValidations = {
      firstInput: true,
      secondInput: true,
      thirdInput: true
    };

   wrapper.instance().areAllValid();

   expect(spyAreAllValid.returned(true)).to.be.true; 
  });

   it('areAllValid() should return false if one or more inputValidation is false', () => {
      wrapper.instance().inputValidations = {
        firstInput: false,
        secondInput: true,
        thirdInput: true
      };

      wrapper.instance().areAllValid();

      expect(spyAreAllValid.returned(false)).to.be.true; 
  });
  
});