import React from 'react';
import Section from './index';
import {mount} from 'enzyme';
import Paper from '@material-ui/core/Paper';

const onButtonClick = jest.fn();
const action = <button id='action-button' onClick={onButtonClick} />
const title = 'section';

const createWrapper = () => mount(<Section headerTitle={title} headerAction={action} />);

describe('Section', () => {
    it('should render the title and the action within a Paper Componenet', () => {
        const wrapper = createWrapper();
        expect(wrapper.find(Paper).length).toBe(1);
        expect(wrapper.find('h3#header-title').text()).toBe('section');
        expect(wrapper.find('button#action-button').length).toBe(1);
    });
})