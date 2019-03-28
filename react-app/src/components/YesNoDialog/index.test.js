import React from 'react';
import YesNoDialog from './index';
import {mount} from 'enzyme';
import {clickButton} from '../../utils/testUtils';

const onClose = jest.fn();
const createWrapper = () => mount(
    <YesNoDialog open={true} onClose={onClose} title={'yes-no'} >
        <span id="yes-no-message">yes-no message</span>
    </YesNoDialog>
)

describe('YesNoDialog', () => {
    it('should render', () => {
        const wrapper = createWrapper();
        expect(wrapper.find('span#yes-no-message').text()).toBe('yes-no message');
        expect(wrapper.find('span#yes-no-title').text()).toBe('yes-no');
    });
    it('should not render when not open', () => {
        const wrapper = mount(
            <YesNoDialog open={false} onClose={onClose} title={'yes-no'} >
                <span id="yes-no-message">yes-no message</span>
            </YesNoDialog>
        );
        expect(wrapper.find('span#yes-no-message').length).toBe(0);
        expect(wrapper.find('span#yes-no-title').length).toBe(0);
    });
    it('should call onClose(false) when no is clicked', () => {
        const wrapper = createWrapper();
        clickButton(wrapper, 'no-button');
        expect(onClose).toBeCalledWith(false);
    });
    it('should call onClose(true) when yes is clicked', () => {
        const wrapper = createWrapper();
        clickButton(wrapper, 'yes-button');
        expect(onClose).toBeCalledWith(true);
    });
})