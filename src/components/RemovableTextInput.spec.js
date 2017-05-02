import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {FormControl, Button} from 'react-bootstrap';

import RemovableTextInput from './RemovableTextInput';
import RequiredTextInput from './RequiredTextInput';

describe('RemovableTextInput', ()=> {
  
  let wrapper,
      spyHandleOnClick,
      // spyHandleOnChange,
      id = 1,
      sandbox = sinon.sandbox.create(),
      spyRemoveClicked = sinon.spy(),
      spyOnChange = sinon.spy();
  
  beforeEach(()=> {
    spyHandleOnClick = sinon.spy(RemovableTextInput.prototype, "handleOnClick");
    // spyHandleOnChange = sandbox.spy(RemovableTextInput.prototype, "handleOnChange");
    wrapper = mount(
      <RemovableTextInput
        onChange={spyOnChange}
        removeClicked={spyRemoveClicked}
        id={id}
    />);
  });
  afterEach(()=> {
    spyHandleOnClick.restore();
    sandbox.restore();
  });
  
  it('has an text input element and a remove button', ()=> {
    const textInput = wrapper.find(RequiredTextInput);
    expect(textInput.length).to.equal(1);
    
    const removeButton = wrapper.find(Button);
    expect(removeButton.length).to.equal(1);
    
    const minusIcon = removeButton.find('i');
    expect(minusIcon.length).to.equal(1);
    //hasClass() called on mount bug when using two classes
    //like 'fa fa-minus'
    expect(minusIcon.hasClass('fa-minus')).to.be.true;
    
  });
  
  it('calls props.onClick on remove button click', ()=> {
    const removeButton = wrapper.find(Button);
    removeButton.simulate('click');
    
    expect(spyHandleOnClick.called).to.be.true;
    expect(spyRemoveClicked.calledWith(id)).to.be.true;
  });
  
  // it('calls props.onChange on input field change', ()=> {
  //   const input = wrapper.find(FormControl);
  //   const e = {
  //     target: {
  //       value: 'val'
  //     }
  //   };
  //   input.simulate('change', e);
    
  //   expect(spyHandleOnChange.called);
  //   expect(spyHandleOnChange.args[0][0].target.value).to.be.equal(e.target.value);
  //   expect(spyOnChange.calledWith(id, e.target.value));
  // });
  
});