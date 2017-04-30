import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {FormControl, Button} from 'react-bootstrap';

import VoteInput from './VoteInput';

let wrapper,
    spyMakeNewOption;
const ip = "123.156.2.1";
beforeEach(() => {
    spyMakeNewOption = sinon.spy(VoteInput.prototype, 'makeNewOption');
    wrapper = shallow(
    <VoteInput 
        ip={ip}
        addNewOption={sinon.spy()}/>);
});

afterEach(() => {
    spyMakeNewOption.restore();
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

    it('handleSubmit(e) should call props.addNewOption with (newOption) returned from makeNewOption() and prevents form submission', () => {
        //restore spyMakeNewOption to stub it
        spyMakeNewOption.restore();
        wrapper.unmount();
        const stubMakeNewOption = sinon.stub(VoteInput.prototype, 'makeNewOption'),
            newOption = {
                _id: 'newid',
                votes: ['some.fancy.user.ip']
            };
        wrapper = shallow(
         <VoteInput 
            ip={ip}
            addNewOption={sinon.spy()}/>);
        stubMakeNewOption.returns(newOption);
        const e = {
            preventDefault: sinon.spy()
        };

        wrapper.instance().handleSubmit(e);

        expect(e.preventDefault.called).to.be.true;
        console.log(wrapper.instance().props.addNewOption.args[0]);
        expect(wrapper.instance().props.addNewOption.calledWith(newOption)).to.be.true;

        stubMakeNewOption.restore();
    });
});