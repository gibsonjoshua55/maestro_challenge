import React from 'react';
import MutationWithError from './MutationWithError';
import { FIND_TIMESTAMP_COLLECTIONS } from '../queries/timestampCollectionQueries';
const gql = require('graphql-tag');


const ADD_TIMESTAMP_COLLECTION = gql`
    mutation AddTimestampCollection($videoId: String!, $title: String!){
        addTimestampCollection(videoId: $videoId, title: $title){
            id
            videoId
            title
        }
    }
`;

export const AddTimestampCollectionMutation = (props) => {
    return(
        <MutationWithError 
            mutation={ADD_TIMESTAMP_COLLECTION}
            update={(cache, { data: { addTimestampCollection } }) => {
                const {timestampCollections}  = cache.readQuery({ 
                    query: FIND_TIMESTAMP_COLLECTIONS, 
                    variables: {
                        videoId: addTimestampCollection.videoId
                    }
                });
                timestampCollections.push(addTimestampCollection);
                cache.writeQuery({
                    query: FIND_TIMESTAMP_COLLECTIONS,
                    variables: {
                        videoId: addTimestampCollection.videoId
                    },
                    data: {timestampCollections},
                });
              }}
            {...props}
        />
    )
}

const DELETE_TIMESTAMP_COLLECTION = gql`
    mutation DeleteTimestampCollection($collectionId: String!){
        deleteTimestampCollection(collectionId: $collectionId){
            id
            videoId
            title
        }
    }
`;
export const DeleteTimestampCollection = (props) => {
    return(
        <MutationWithError 
            mutation={DELETE_TIMESTAMP_COLLECTION}
            update={(cache, { data: { deleteTimestampCollection } }) => {
                const {timestampCollections}  = cache.readQuery({ 
                    query: FIND_TIMESTAMP_COLLECTIONS, 
                    variables: {
                        videoId: deleteTimestampCollection.videoId
                    }
                });
                cache.writeQuery({
                    query: FIND_TIMESTAMP_COLLECTIONS,
                    variables: {
                        videoId: deleteTimestampCollection.videoId
                    },
                    data: {timestampCollections: timestampCollections.filter((timestampCollection) => {
                        return timestampCollection.id !== deleteTimestampCollection.id;
                    })},
                });
              }}
            {...props}
        />
    )
}

const UPDATE_TIMESTAMP_COLLECTION = gql`
    mutation UpdateTimestampCollection($collectionId: String!, $title: String!){
        updateTimestampCollection(collectionId: $collectionId, title: $title){
            id
            videoId
            title
        }
    }
`;

export const UpdateTimestampCollectionMutation = (props) => {
    return (
        <MutationWithError mutation={UPDATE_TIMESTAMP_COLLECTION} {...props} />
    );
};