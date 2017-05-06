import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';

import PollTitle from './PollTitle';

describe('PollTittle', () => {
    let wrapper;
    const pollName = 'some poll name',
          authorName = 'author name';

    it('should render the poll name', () => {
        wrapper = shallow(<PollTitle pollName={pollName} />);

        expect(wrapper.text()).to.include(pollName);
    });
    
    it('should render the poll author name if props.showAuthor is true', () => {
        wrapper = shallow(<PollTitle pollName={pollName} authorName={authorName} showAuthor />);

        expect(wrapper.text()).to.include(authorName);
    });

    it('should not render the poll author name if props.showAuthor is false', () => {
        wrapper = shallow(<PollTitle pollName={pollName} authorName={authorName} />);

        expect(wrapper.text()).to.not.include(authorName);
    });

    it('Author name should be "You" if prop isOwnPoll is true', () => {
         wrapper = shallow(<PollTitle pollName={pollName} authorName={authorName} showAuthor isOwnPoll/>);

        expect(wrapper.text()).to.include('You');
    });

    it('should render content in a h4 if size is "sm"', () => {
        wrapper = shallow(<PollTitle pollName={pollName} size="sm"/>);
        const h4 = wrapper.find('h4');

        expect(h4).to.have.length(1);
    });

    it('should render content in a h2 if size is "lg"', () => {
        wrapper = shallow(<PollTitle pollName={pollName} size="lg"/>);
        const h2 = wrapper.find('h2');

        expect(h2).to.have.length(1);
    });
});
