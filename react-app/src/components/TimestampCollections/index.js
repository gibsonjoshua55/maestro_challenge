import React from 'react';
import PropTypes from 'prop-types';
import EditableList from '../EditableList';
import timestampCollectionType from '../../types/timestampCollection';


export const TimestampCollections = (props) => {
    const {timestampCollections, onSelected, onUpdate, onAdd, videoId, onDelete, selectedId} = props;
    return(
        <EditableList
            title="Timestamp Collections"
            onUpdate={(id, {title}) => {
                onUpdate({variables: {collectionId: id, title}});
            }}
            onAdd={(obj) => {
                onAdd({variables: {videoId, ...obj}});
            }}
            onDelete={(collectionId) => {
                onDelete({variables: {collectionId}});
            }}
            objs={timestampCollections}
            idKey='id'
            types={timestampCollectionType}
            onClick={onSelected}
            enabled={true}
            selectedId={selectedId}
        />
    )
}


TimestampCollections.propTypes = {
    timestampCollections: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string
    })),
    onSelected: PropTypes.func,
    onUpdate: PropTypes.func,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    videoId: PropTypes.string,
    selectedId: PropTypes.string
}

export default TimestampCollections;