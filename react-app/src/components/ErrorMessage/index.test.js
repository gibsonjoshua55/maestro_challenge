import React from 'react';
import {ErrorMessage} from './index';
import { mount } from 'enzyme';


describe('ErrorMessage', () => {
    it('should render and error message', () => {
        const wrapper = mount(<ErrorMessage message='test-error' classes={{}}/> );
        const snackBar = wrapper.find('span#client-snackbar');
        expect(snackBar.text()).toBe('test-error');
    })
})