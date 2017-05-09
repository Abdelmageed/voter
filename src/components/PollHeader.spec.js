import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {Link} from 'react-router';

import PollHeader from './PollHeader';

describe('PollHeader', () => {

    const poll = {
        _id: '123',
        _author: {
            local: {
                username: 'I am the author'
            },
            _id: 'and that\'s my id'
        },
        options: [
            {name: 'winner', votes: ['1', '2', '3']},
            {name: 'loser', votes: ['1']},
            {name: 'second best', votes: ['1', '2']}
        ]
    };

    let wrapper = shallow(<PollHeader {...poll} />);

    it('should render a Link to poll details page with the passed _id prop', () => {
        const link = wrapper.find(Link);

        expect(link).to.have.length(1);
        expect(link.prop('to')).to.equal(`/poll-detail/${poll._id}`);
    });

    it('should render the first two leading options in votes if showLeadingOptions is true', () => {
        wrapper = shallow(<PollHeader {...poll} showLeadingOptions/>);

        const leadingOptions = wrapper.find('.leading-option');

        expect(leadingOptions).to.have.length(2);
        expect(leadingOptions.at(0).text()).to.include('winner');
        expect(leadingOptions.at(0).text()).to.include('3');
        
        expect(leadingOptions.at(1).text()).to.include('second best');
        expect(leadingOptions.at(1).text()).to.include('2');
        
    });

    it('getLeadingOptions() should return the first two options with most votes, sorted descendingly', () => {
        expect(wrapper.instance().getLeadingOptions()).to.deep.equal([
            {name: 'winner', votes: ['1', '2', '3']},
            {name: 'second best', votes: ['1', '2']}
        ]);
    });
});