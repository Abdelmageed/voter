import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import { FormControl, ControlLabel} from 'react-bootstrap';

import CreatePollForm from './CreatePollForm';

describe('CreatePollForm', ()=> {
  
  let wrapper;
  before(()=> {
    wrapper = shallow(<CreatePollForm />);
  });
  beforeEach(()=> {
    
  });
  
  afterEach(()=> {
    
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
});