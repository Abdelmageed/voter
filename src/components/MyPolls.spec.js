import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import MyPolls from './MyPolls';
import Poll from '../containers/Poll';

describe('MyPolls component', () => {
let wrapper,
    userPollIds = ['myFirstPollId', 'mySecondPollId'],
    sandbox = sinon.sandbox.create(),
    spyShowForm;
  
  beforeEach(() => {
    spyShowForm = sandbox.spy(MyPolls.prototype, 'showForm');
    wrapper = shallow(<MyPolls userPollIds={userPollIds} />);
  });

  afterEach(() => {
    sandbox.restore();
//    wrapper.unmount();
  });
  
  
 it('should render a CreatePollForm when state.showForm is true', () => {
   wrapper.instance().setState({showForm: true});
   
   expect(wrapper.find('#createPollForm')).to.have.length(1);
   expect(wrapper.find('#createPollButton')).to.have.length(0);
   
 });
  
  it('should render a createPollButon when state.showForm is false', () => {
    wrapper.instance().setState({showForm: false});

    expect(wrapper.find('#createPollForm')).to.have.length(0);
    expect(wrapper.find('#createPollButton')).to.have.length(1);
  });
  
  it('closeForm() should set state.showForm to false', () => {
    wrapper.instance().state.showForm = true;
    wrapper.instance().closeForm();
    expect(wrapper.instance().state.showForm).to.be.false;
  });
  
    it('showForm() should set state.showForm to true', () => {
    wrapper.instance().state.showForm = false;
    wrapper.instance().showForm();
    expect(wrapper.instance().state.showForm).to.be.true;
  });
  
  it('createPollButton should call showForm on click', () => {
    const button = wrapper.find('#createPollButton');
    button.simulate('click');
    
    expect(spyShowForm.called).to.be.true;
  });

  it('should render the user polls', () => {
    const userPolls = wrapper.find(Poll);

    expect(userPolls).to.have.lengthOf(userPollIds.length);
  });
  
});

