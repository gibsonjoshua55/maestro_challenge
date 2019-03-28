import React from 'react';
import PropTypes from 'prop-types';
import TimestampCollections from '../../components/TimestampCollections';
import {FindTimestampCollectionsQuery} from '../../queries/timestampCollectionQueries';
import {
        UpdateTimestampCollectionMutation, 
        AddTimestampCollectionMutation,
        DeleteTimestampCollection
    } from '../../mutations/timestampCollectionMutations';

const TimestampCollectionsContainer = (props) => {
    const {videoId, onTimestampCollectionSelected, selectedId} = props;
    return(
        <FindTimestampCollectionsQuery
            videoId={videoId}
        >
            {
                (props) => {
                    const { data } = props;
                    
                    if(data){
                        return(
                            <UpdateTimestampCollectionMutation>
                            {(updateTimestampCollection) =>{
                                return(
                                    <AddTimestampCollectionMutation
                                        onCompleted={({addTimestampCollection}) => {
                                            onTimestampCollectionSelected(addTimestampCollection.id);
                                        }}
                                    >
                                    {(addTimestampCollection) =>{
                                        return(<DeleteTimestampCollection>
                                        {(deleteTimestampCollection) =>{
                                            let timestampCollections;
                                            if(data.timestampCollections)
                                                timestampCollections = data.timestampCollections.sort((a, b) => {
                                                    return a.title.localeCompare(b.title);
                                                })
                                            return(<TimestampCollections 
                                                timestampCollections={timestampCollections} 
                                                videoId={videoId}
                                                onSelected={(collectionId) => {onTimestampCollectionSelected(collectionId)}}
                                                onUpdate={(variables) => {
                                                    updateTimestampCollection(variables);
                                                }}
                                                onAdd={(variables) => {
                                                    addTimestampCollection(variables)
                                                }}
                                                onDelete={(variables) => {
                                                    deleteTimestampCollection(variables);
                                                }}
                                                selectedId={selectedId}
                                            />)
                                        }}
                                        </DeleteTimestampCollection>)
                                    }}
                                    </AddTimestampCollectionMutation>
                                )
                            }}
                            </UpdateTimestampCollectionMutation>
                        )
                    }
                    else {
                        return(  
                            <TimestampCollections />
                        )

                    }
                }
            }
        </FindTimestampCollectionsQuery>
    )
}

TimestampCollectionsContainer.propTypes = {
    videoId: PropTypes.string.isRequired,
    onTimestampCollectionSelected: PropTypes.func.isRequired,
    selectedId: PropTypes.string
}

export default TimestampCollectionsContainer;