import React from 'react';
import {mount} from 'enzyme';
import Player from './index';
import YouTube from 'react-youtube';

describe('Player', () => {
    it('should render YouTube component and set its onready', () => {
        const onReady = jest.fn();
        const wrapper = mount(<Player videoId='6KnnbiBwwTU' onReady={onReady}/>);
        const youtube = wrapper.find(YouTube).get(0);
        youtube.props.onReady({target: 'player'});
        expect(onReady).toBeCalledWith('player');

    })
})