import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {Link} from 'react-router';

import PollHeader from './PollHeader';

describe('PollHeader', () => {

    let _id = '123',
        _author = {
            local: {
                username: 'I am the author'
            },
            _id: 'and that\'s my id'
        },
        wrapper = shallow(<PollHeader _id={_id} />);

    it('should render a Link to poll details page with the passed _id prop', () => {
        const link = wrapper.find(Link);

        expect(link).to.have.length(1);
        expect(link.prop('to')).to.equal(`/poll/${_id}`);
    });

    it('header title should contain author name if showAuthor is true', () => {
        wrapper = shallow(<PollHeader _id={_id} showAuthor _author={_author}/>);
        const link = wrapper.find('#headerTitle');

        expect(link.text()).to.include(_author.local.username);
    });

    
});