import React from 'react';
import { mount } from 'enzyme';
import timestampType from '../../types/timestamp';
import EditableListItem from '../EditableListItem';
import {clickButton, clickDiv, typeInInput} from '../../utils/testUtils';

const timestamp = {id: '1', title: 'first-timestamp', time: '1:00', bpm: 112}

const checkTimetstamp = (wrapper, keys, timestamp) => {
    keys.forEach((key) => {
        expect(wrapper.find(`span#ListItem-${key}`).text()).toBe(timestamp[key])
    });
}

const onDelete = jest.fn();
const onUpdate = jest.fn();
const onClick = jest.fn();
const title = 'Timestamps';

const createWrapper = () => (mount(
    <EditableListItem 
        types={timestampType} 
        obj={timestamp}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onClick={onClick}
        title={title}
        id={'1'}/>))

describe('EditableListItem', () => {
    it('should render the item', () => {
        const wrapper = createWrapper();
        expect(wrapper.find('span#ListItem-time').text()).toBe('Time: 1:00');
        expect(wrapper.find('span#ListItem-title').text()).toBe('first-timestamp');
        expect(wrapper.find('span#ListItem-bpm').text()).toBe('BPM: 112');
    });
    it('calls update when the edit is toggled on and off', () => {
        const wrapper = createWrapper();
        clickButton(wrapper, 'edit-button-1');
        clickButton(wrapper, 'edit-button-1');
        expect(onUpdate).toBeCalledWith({title:'first-timestamp', time: '1:00', bpm: 112});
        clickButton(wrapper, 'edit-button-1');
        typeInInput(wrapper, 'ListItemInput-time', '1:10s');
        clickButton(wrapper, 'edit-button-1');
        typeInInput(wrapper, 'ListItemInput-time', '1:10');
        typeInInput(wrapper, 'ListItemInput-title', 'new-title');
        clickButton(wrapper, 'edit-button-1');
        expect(onUpdate).toBeCalledTimes(2);
        expect(onUpdate).toBeCalledWith({title:'new-title', time: '1:10', bpm: 112});
    });
    it('calls delete when the delete but is clicked', () => {
        const wrapper = createWrapper();
        clickButton(wrapper, 'delete-button-1');
        clickButton(wrapper, 'delete-button-1');
        clickButton(wrapper, 'yes-button');
        expect(onDelete).toBeCalled();
    });
    it('calls onClick when item is clicked', () => {
        const wrapper = createWrapper();
        clickDiv(wrapper, 'item-1');
        expect(onClick).toBeCalled();
    });
})