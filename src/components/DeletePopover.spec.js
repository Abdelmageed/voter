import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import {Modal} from 'react-bootstrap';

import DeletePopover from './DeletePopover';

describe('DeletePopover', () => {
    let wrapper;

    it('should render a modal when show is true', () => {
        wrapper = shallow(<DeletePopover show />);

        const modal = wrapper.find(Modal);
        
        expect(modal).to.have.length(1);
    });

    it('should call delete and hide on delete button click', () => {
        const spyDelete = sinon.spy(),
            spyHide = sinon.spy();
        wrapper = shallow(<DeletePopover show delete={spyDelete} hide={spyHide}/>);

        const deleteButton = wrapper.find('#deleteButton');
        deleteButton.simulate('click');

        expect(spyDelete.called).to.be.true;
        expect(spyHide.called).to.be.true;        
    });
}) ;