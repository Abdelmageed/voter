import React from 'react';
import {expect} from 'chai';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import {Button} from 'react-bootstrap';

import TwitterSignupButton from './TwitterSignupButton';

describe('TwitterSignupButton', () => {

    let spySubmit = sinon.spy(),
        wrapper = shallow(<TwitterSignupButton signup={spySubmit}/>);
    
    it('should render a Signup With Twitter Button', () => {
        const button = wrapper.find(Button);

        expect(button).to.have.length(1);
    });

    it('Signup button should call signup on click', () => {
        const button = wrapper.find(Button);

        button.simulate('click');

        expect(spySubmit.called).to.be.true;
    });
});