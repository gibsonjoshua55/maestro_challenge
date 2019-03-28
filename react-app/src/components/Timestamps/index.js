import React from 'react';
import PropTypes from 'prop-types';
import EditableList from '../EditableList';
import {timeToSeconds, secondsToTime} from '../../utils/formatTime';
import timestampType from '../../types/timestamp';

export const Timestamp = (props) => {
    const {timestamps, onUpdate, onAdd, collectionId, onDelete, playTimestamp, disabled} = props;
    let formattedTimestamps;
    if(timestamps){ 
        formattedTimestamps = timestamps.map((timestamp) => {
            const formattedTimestamp = Object.assign({}, timestamp);
            formattedTimestamp.time = secondsToTime(formattedTimestamp.time);
            return formattedTimestamp; 
        });
    }
    else{
        formattedTimestamps = [];
    }
    return(
        <EditableList
            title="Timestamps"
            onUpdate={(id, obj) => {
                const {time, bpm, ...rest} = obj;
                onUpdate({variables: {
                    collectionId: collectionId, 
                    timestampId: id, 
                    time: timeToSeconds(time),
                    bpm: parseInt(bpm),
                    ...rest}});
            }}
            onAdd={(obj) => {
                const {time, bpm, ...rest} = obj;
                onAdd({variables: {collectionId, time: timeToSeconds(time), bpm: parseInt(bpm), ...rest}});
            }}
            onDelete={(timestampId) => {
                onDelete({variables: {collectionId, timestampId: timestampId}});
            }}
            objs={formattedTimestamps}
            idKey='id'
            types={timestampType}
            onClick={(id, timestamp) => {
                playTimestamp(timeToSeconds(timestamp.time), timestamp.bpm)
            }}
            enabled={collectionId !== undefined}
            disabled={disabled}
        />
    )
}


Timestamp.propTypes = {
    timestampCollections: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string
    })),
    collectionId: PropTypes.string,
    seekTo: PropTypes.func,
    onUpdate: PropTypes.func,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    videoId: PropTypes.string,
    disabled: PropTypes.bool
}

export default Timestamp;