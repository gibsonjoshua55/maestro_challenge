import React from 'react';
import { mount } from 'enzyme';
import EditableList from './index';
import timestampType from '../../types/timestamp';
import EditableListItem from '../EditableListItem';
import {clickButton, clickDiv, typeInInput} from '../../utils/testUtils';


const timestamps = [
    {id: '1', title: 'first-timestamp', time: '1:00'},
    {id: '2', title: 'second-timestamp', time: '2:00'}
]

const checkTimetstamp = (timestampNode, timestamp) => {
    if(timestampNode.prop('id') !== timestamp.id)
        return false;
    if(timestampNode.prop('title') !== timestamp.title)
        return false;
    if(timestampNode.prop('time') !== timestamp.time)
        return false;
    return true;
}

const onDelete = jest.fn();
const onUpdate = jest.fn();
const onAdd = jest.fn();
const onClick = jest.fn();
const title = 'Timestamps';

const createWrapper = () => (mount(
    <EditableList 
        types={timestampType} 
        objs={timestamps}
        onDelete={onDelete}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onClick={onClick}
        title={title}
        idKey={'id'}
        enabled={true}/>))

describe('AddDialog', () => {
    it('renders the items', () => {
        const wrapper = createWrapper();
        const timestampItems = wrapper.find(EditableListItem);
        expect(timestampItems.length).toBe(2);
        timestampItems.forEach((timestampNode, i) => checkTimetstamp(timestampNode, timestamps[i]));
    });
    it('creates an add dialog and can add an item', () => {
        const wrapper = createWrapper();
        clickButton(wrapper, 'add-button');
        typeInInput(wrapper, 'add-title', 'new-title');
        typeInInput(wrapper, 'add-time', '1:10');
        clickButton(wrapper, 'submit');
        expect(onAdd).toBeCalledWith({title:'new-title', time: '1:10'});
    });
    it('calls update when the edit is toggled on and off', () => {
        const wrapper = createWrapper();
        clickButton(wrapper, 'edit-button-1');
        clickButton(wrapper, 'edit-button-1');
        expect(onUpdate).toBeCalledWith('1', {title:'first-timestamp', time: '1:00'});
    });
    it('calls delete when the delete but is clicked', () => {
        const wrapper = createWrapper();
        clickButton(wrapper, 'delete-button-2');
        clickButton(wrapper, 'delete-button-2');
        clickButton(wrapper, 'yes-button');
        expect(onDelete).toBeCalledWith('2');
    });
    it('calls onClick when item is clicked', () => {
        const wrapper = createWrapper();
        clickDiv(wrapper, 'item-1');
        expect(onClick).toBeCalledWith('1', timestamps[0]);
    });
})

