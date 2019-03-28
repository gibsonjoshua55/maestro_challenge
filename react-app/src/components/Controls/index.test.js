import React from 'react';
import {mount} from 'enzyme';
import Controls from './index';
import {clickButton} from '../../utils/testUtils';

const playTimestamp = jest.fn();
const setControls = jest.fn();

const timestamps = [
    {id: '1', title: 'first', time: 1, bpm: 120},
    {id: '2', title: 'second', time: 2, bpm: 130}
]


const createWrapper = (controls) => (
    mount(<Controls 
        playTimestamp={playTimestamp}
        setControls={setControls}
        timestamps={timestamps}
        controls={controls}
    />))

describe('Controls', () => {
    it('should render a count in and loop switch', () => {
        const wrapper = createWrapper({
            countIn: false, 
            loop: false, loopStart: {value: -1, bpm: undefined}, loopEnd: {value: -2, bpm: undefined}
        });
        expect(wrapper.find('input#count-in-switch').length).toBe(1);
        expect(wrapper.find('input#loop-switch').length).toBe(1);
    });
    it('should call setControls when switches are clicked', () => {
        const controls = {
            countIn: false, 
            loop: false, loopStart: {value: -1, bpm: undefined}, loopEnd: {value: -2, bpm: undefined}
        }
        const wrapper = createWrapper(controls);
        wrapper.find('input#count-in-switch').simulate('change', {target: {checked: true}});
        expect(setControls).toBeCalledWith(Object.assign({}, controls, {countIn: true}));
        wrapper.find('input#loop-switch').simulate('change', {target: {checked: true}});
        expect(setControls).toBeCalledWith(Object.assign({}, controls, {loop: true}));
    });
    it('playTimetstamp is called when start button is pressed', () => {
        const controls = {
            countIn: false, 
            loop: true, loopStart: {value: -1, bpm: undefined}, loopEnd: {value: -2, bpm: undefined}
        }
        const wrapper = createWrapper(controls);
        clickButton(wrapper, 'start-loop-button');
        expect(playTimestamp).toBeCalledWith(-1, undefined);
    })

})