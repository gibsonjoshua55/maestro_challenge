import React from 'react';
import { mount } from 'enzyme';
import Timestamp from './index';
import EditableListItem from '../EditableListItem';
import {clickButton, clickDiv, typeInInput} from '../../utils/testUtils';

const timestamps = [
    {id: '1', title: 'first-timestamp', time: 60, bpm: 120},
    {id: '2', title: 'second-timestamp', time: 120, bpm: 60}
]

const checkTimetstampCollection = (timestampNode, timestamp) => {
    if(timestampNode.prop('id') !== timestamp.id)
        return false;
    if(timestampNode.prop('title') !== timestamp.title)
        return false;
    if(timestampNode.prop('time') !== timestamp.time)
        return false;
    if(timestampNode.prop('bpm') !== timestamp.bmp)
        return false;
    return true;
}

const onDelete = jest.fn();
const onUpdate = jest.fn();
const onAdd = jest.fn();
const playTimestamp = jest.fn();
const createWrapper = () => (mount(
    <Timestamp 
        timestamps={timestamps}
        videoId={'6KnnbiBwwTU'}
        onDelete={onDelete}
        onAdd={onAdd}
        onUpdate={onUpdate}
        playTimestamp={playTimestamp}
        collectionId={'1'}
        enabled={true}
    />))

describe('Timestamps', () => {
    it('renders the items', () => {
        const wrapper = createWrapper();
        const timestampItems = wrapper.find(EditableListItem);
        expect(timestampItems.length).toBe(2);
        timestampItems.forEach((timestampNode, i) => checkTimetstampCollection(timestampNode, timestamps[i]));
    });
    it('creates an add dialog and can add an item', () => {
        const wrapper = createWrapper();
        clickButton(wrapper, 'add-button');
        typeInInput(wrapper, 'add-title', 'new-title');
        typeInInput(wrapper, 'add-time', '1:20');
        typeInInput(wrapper, 'add-bpm', 140)
        clickButton(wrapper, 'submit');
        expect(onAdd).toBeCalledWith({variables: {collectionId: '1', title:'new-title', time: 80, bpm: 140}});
    });
    it('calls update when the edit is toggled on and off', () => {
        const wrapper = createWrapper();
        clickButton(wrapper, 'edit-button-1');
        clickButton(wrapper, 'edit-button-1');
        expect(onUpdate).toBeCalledWith({variables: {bpm: 120, collectionId: '1', timestampId: '1', title:'first-timestamp', time: 60}});
    });
    it('calls delete when the delete but is clicked', () => {
        const wrapper = createWrapper();
        clickButton(wrapper, 'delete-button-2');
        clickButton(wrapper, 'delete-button-2');
        clickButton(wrapper, 'yes-button');
        expect(onDelete).toBeCalledWith({variables: {collectionId: '1', timestampId: '2'}});
    });
    it('calls onSelected when an item is clicked', () => {
        const wrapper = createWrapper();
        clickDiv(wrapper, 'item-1');
        expect(playTimestamp).toBeCalledWith(60, 120);
    });
})

