import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {FormControl, Button, HelpBlock} from 'react-bootstrap';

import VoteInput from './VoteInput';

let wrapper,
    sandbox = sinon.sandbox.create(),
    spyMakeNewOption,
    spyGetOptionNameValidation,
    spyGetStateValidation;
const ip = "123.156.2.1";
beforeEach(() => {
    spyMakeNewOption = sandbox.spy(VoteInput.prototype, 'makeNewOption');
    spyGetOptionNameValidation = sandbox.spy(VoteInput.prototype, 'getOptionNameValidation');
    spyGetStateValidation = sandbox.spy(VoteInput.prototype, "getStateValidation");
    wrapper = shallow(
    <VoteInput 
        ip={ip}
        addNewOption={sandbox.spy()}/>);
});

afterEach(() => {
    sandbox.restore();
});

describe('VoteInput', () => {

    it('should render a form for adding a new vote with a FormControl and a submit Button', () => {
        expect(wrapper.find(Button)).to.have.length(1);
        expect(wrapper.find(FormControl)).to.have.length(1);
    });

    it('makeNewOption() should return an option object with name and a votes array containing the user\'s ip', () => {
        const optionName = "new option",
            option = {
                name: optionName,
                votes: [ip]
            };
        wrapper.instance().setState({optionName});
        
        wrapper.instance().makeNewOption();

        expect(spyMakeNewOption.returned(option)).to.be.true;
    });

    it('getOptionNameValidation() should return (false) if state.optionName is an empty string', () => {
        wrapper.instance().setState({optionName: ''});

        wrapper.instance().getOptionNameValidation();

        expect(spyGetOptionNameValidation.returned(false)).to.be.true;
    });

    it('getOptionNameValidation() should return (true) if state.optionName is not an empty string', () => {
        wrapper.instance().setState({optionName: 'not empty'});

        wrapper.instance().getOptionNameValidation();

        expect(spyGetOptionNameValidation.returned(true)).to.be.true;
    });

    it('should render an error message (HelpBlock component) on error', () => {
        wrapper = shallow(<VoteInput />);
        wrapper.instance().setState({
            isValid: false
        });

        const errorMessage = wrapper.find(HelpBlock);

        expect(errorMessage).to.have.length(1);
    });

    it('handleSubmit(e) should call props.addNewOption with (newOption) returned from makeNewOption() and prevents form submission if input is valid', () => {
        //restore spyMakeNewOption to stub it
        spyMakeNewOption.restore();
        spyGetOptionNameValidation.restore();
        wrapper.unmount();
        const stubMakeNewOption = sandbox.stub(VoteInput.prototype, 'makeNewOption'),
            stubGetOptionNameValidation = sandbox.stub(VoteInput.prototype, 'getOptionNameValidation'),
            newOption = {
                _id: 'newid',
                votes: ['some.fancy.user.ip']
            };

        wrapper = shallow(
         <VoteInput 
            ip={ip}
            addNewOption={sandbox.spy()}/>);

        stubMakeNewOption.returns(newOption);
        stubGetOptionNameValidation.returns(true);

        const e = {
            preventDefault: sandbox.spy()
        };

        wrapper.instance().handleSubmit(e);

        expect(e.preventDefault.called).to.be.true;
        expect(wrapper.instance().props.addNewOption.calledWith(newOption)).to.be.true;

        stubMakeNewOption.restore();
    });

    it('handleSubmit(e) should return after getOptionNameValidation() returns (false)', () => {
        spyGetOptionNameValidation.restore();
        wrapper.unmount();
        const stubGetOptionNameValidation = sandbox.stub(VoteInput.prototype, 'getOptionNameValidation');
        stubGetOptionNameValidation.returns(false);
        const e = {
            preventDefault: sandbox.spy()
        };
        wrapper = shallow(
         <VoteInput 
            ip={ip}
            addNewOption={sandbox.spy()}/>);

        wrapper.instance().handleSubmit(e);
        
        expect(e.preventDefault.called).to.be.true;
        expect(wrapper.instance().props.addNewOption.called).to.be.false;
    });

    it('getStateValidation() should return ("error") if !state.isValid', () => {
        wrapper.instance().setState({
            isValid: false
        });
        
        wrapper.instance().getStateValidation();

        expect(spyGetStateValidation.returned("error")).to.be.true;
    });

    it('getStateValidation() should return (null) if state.isValid', () => {
        wrapper.instance().setState({
            isValid: true
        });
        
        wrapper.instance().getStateValidation();

        expect(spyGetStateValidation.returned(null)).to.be.true;
    });
});