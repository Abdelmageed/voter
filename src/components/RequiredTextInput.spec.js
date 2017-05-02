import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from 'sinon';
import {HelpBlock} from 'react-bootstrap';

import RequiredTextInput from './RequiredTextInput';

describe('RequiredTextInput', () => {

    let wrapper,
        sandbox = sinon.sandbox.create(),
        spyGetValidation,
        spyGetValidationState;

    beforeEach(() => {
        spyGetValidation = sandbox.spy(RequiredTextInput.prototype, 'getValidation');
        spyGetValidationState = sandbox.spy(RequiredTextInput.prototype, 'getValidationState');
        wrapper = shallow(<
            RequiredTextInput

        />);
    });

    afterEach(() => {
        wrapper.unmount();
        sandbox.restore();
    });


    it('getValidation() should return (false) if state.value is an empty string', () => {
        wrapper.instance().setState({value: ''});

        wrapper.instance().getValidation();

        expect(spyGetValidation.returned(false)).to.be.true;
    });

    it('getValidation() should return (true) if state.value is not an empty string', () => {
        wrapper.instance().setState({value: 'not empty'});

        wrapper.instance().getValidation();

        expect(spyGetValidation.returned(true)).to.be.true;
    });

    it('getValidationState() should return ("error") if !state.isValid', () => {
        wrapper.instance().setState({
            isValid: false
        });
        
        wrapper.instance().getValidationState();

        expect(spyGetValidationState.returned("error")).to.be.true;
    });

    it('getValidationState() should return (null) if state.isValid', () => {
        wrapper.instance().setState({
            isValid: true
        });
        
        wrapper.instance().getValidationState();

        expect(spyGetValidationState.returned(null)).to.be.true;
    });

    it('should render an error message (HelpBlock component) on error', () => {
        wrapper.instance().setState({
            isValid: false
        });

        const errorMessage = wrapper.find(HelpBlock);

        expect(errorMessage).to.have.length(1);
    });
});