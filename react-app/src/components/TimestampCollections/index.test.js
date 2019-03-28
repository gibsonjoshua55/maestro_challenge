import React from 'react';
import { mount } from 'enzyme';
import TimestampCollection from './index';
import EditableListItem from '../EditableListItem';
import {clickButton, clickDiv, typeInInput} from '../../utils/testUtils';


const timestampCollections = [
    {id: '1', title: 'first-timestamp-collection'},
    {id: '2', title: 'second-timestamp-colleciton'}
]

const checkTimetstampCollection = (timestampNode, timestamp) => {
    if(timestampNode.prop('id') !== timestamp.id)
        return false;
    if(timestampNode.prop('title') !== timestamp.title)
        return false;
    return true;
}

const onDelete = jest.fn();
const onUpdate = jest.fn();
const onAdd = jest.fn();
const onSelected = jest.fn();

const createWrapper = () => (mount(
    <TimestampCollection 
        timestampCollections={timestampCollections}
        videoId={'6KnnbiBwwTU'}
        onDelete={onDelete}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onSelected={onSelected}
        enabled={true}/>))

describe('TimestampCollections', () => {
    it('renders the items', () => {
        const wrapper = createWrapper();
        const timestampItems = wrapper.find(EditableListItem);
        expect(timestampItems.length).toBe(2);
        timestampItems.forEach((timestampNode, i) => checkTimetstampCollection(timestampNode, timestampCollections[i]));
    });
    it('creates an add dialog and can add an item', () => {
        const wrapper = createWrapper();
        clickButton(wrapper, 'add-button');
        typeInInput(wrapper, 'add-title', 'new-title');
        clickButton(wrapper, 'submit');
        expect(onAdd).toBeCalledWith({variables: {title:'new-title', videoId: '6KnnbiBwwTU'}});
    });
    it('calls update when the edit is toggled on and off', () => {
        const wrapper = createWrapper();
        clickButton(wrapper, 'edit-button-1');
        clickButton(wrapper, 'edit-button-1');
        expect(onUpdate).toBeCalledWith({variables: {collectionId: '1', title:'first-timestamp-collection'}});
    });
    it('calls delete when the delete but is clicked', () => {
        const wrapper = createWrapper();
        clickButton(wrapper, 'delete-button-2');
        clickButton(wrapper, 'delete-button-2');
        clickButton(wrapper, 'yes-button');
        expect(onDelete).toBeCalledWith({variables: {collectionId: '2'}});
    });
    it('calls onSelected when an item is clicked', () => {
        const wrapper = createWrapper();
        clickDiv(wrapper, 'item-1');
        expect(onSelected).toBeCalledWith('1', {id: '1', title: 'first-timestamp-collection'});
    });
})

