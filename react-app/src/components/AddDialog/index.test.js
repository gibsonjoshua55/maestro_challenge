import React from 'react';
import AddDialog from './index';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { mount } from 'enzyme';
import timestampType from '../../types/timestamp';
import TextField from '@material-ui/core/TextField';
import {clickButton, typeInInput} from '../../utils/testUtils';

describe('AddDialog', () => {
    it('renders a Dialog component', () => {
        const wrapper = mount(<AddDialog types={timestampType} open={false}/>);
        //console.log(wrapper.debug())
        expect(wrapper.find(Dialog).length).toBe(1);
    });
    it('only renders DialogContent if the Dialog is open', () => {
        const closedWrapper = mount(<AddDialog types={timestampType} open={false}/>);
        expect(closedWrapper.find(DialogContent).length).toBe(0);
        const openWrapper = mount(<AddDialog types={timestampType} open={true}/>);
        expect(openWrapper.find(DialogContent).length).toBe(1);
    });
    it('Returns input when add is clicked', () => {
        const onClose = jest.fn();
        const wrapper = mount(<AddDialog types={timestampType} open={true} onClose={onClose}/>);
        typeInInput(wrapper, 'add-title', 'new-title');
        typeInInput(wrapper, 'add-time', '1:10');
        typeInInput(wrapper, 'add-bpm', 112);
        clickButton(wrapper, 'submit');
        expect(onClose).toBeCalledWith({title:'new-title', time: '1:10', bpm: 112});
    });
    it('Does not submit when there are errors and shows error', () => {
        const onClose = jest.fn();
        const wrapper = mount(<AddDialog types={timestampType} open={true} onClose={onClose}/>);
        typeInInput(wrapper, 'add-title', 'new-title');
        typeInInput(wrapper, 'add-time', '1:10s');
        clickButton(wrapper, 'submit');
        expect(onClose).toHaveBeenCalledTimes(0);
        const timeInput = wrapper.findWhere((node) => (
            node.is(TextField) && node.prop('id') === 'add-time'
        )).get(0)
        expect(timeInput.props.error).toBe(true);
    })
    it('Return nothing when cancel is clicked', () => {
        const onClose = jest.fn();
        const wrapper = mount(<AddDialog types={timestampType} open={true} onClose={onClose}/>);
        clickButton(wrapper, 'cancel');
        expect(onClose).toBeCalledWith(undefined);
    })
})

