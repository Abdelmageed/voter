import React from 'react';
import {mount} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {FormControl} from 'react-bootstrap';

import TextInput from './TextInput';

describe('TextInput', ()=> {
  
  let wrapper,
      spyHandleOnChange,
      id = 1,
      sandbox = sinon.sandbox.create(),
      spyOnChange = sinon.spy();
  
  beforeEach(()=> {
    spyHandleOnChange = sandbox.spy(TextInput.prototype, "handleOnChange");
    wrapper = mount(
      <TextInput
        onChange={spyOnChange}
        id={id}
    />);
  });
  afterEach(()=> {
    sandbox.restore();
  });
  
  
  it('calls props.onChange on input field change', ()=> {
    const input = wrapper.find(FormControl);
    const e = {
      target: {
        value: 'val'
      }
    }
    input.simulate('change', e);
    
    expect(spyHandleOnChange.called);
    expect(spyHandleOnChange.args[0][0].target.value).to.be.equal(e.target.value);
    expect(spyOnChange.calledWith(id, e.target.value));
  });
  
});