import React from 'react';
import gql from 'graphql-tag';
import MutationWithError from './MutationWithError';

const ADD_TIMESTAMP = gql`
    mutation AddTimestamp($collectionId: String!, $title: String!, $time: Float!, $bpm: Float){
        addTimestamp(collectionId: $collectionId, title: $title, time: $time, bpm: $bpm){
            id
            title
            time
            bpm
        }
    }
`;

const collectionFragment = gql`fragment collection on TimestampCollection {
    timestamps{
        id
        title
        time
        bpm
    }
}`

export const AddTimestampMutation = (props) => {
    const {collectionId, ...rest} = props;
    return(
        <MutationWithError 
            mutation={ADD_TIMESTAMP}
            update={(cache, { data: { addTimestamp } }) => {
                var fragmentResult = cache.readFragment({
                    id: "TimestampCollection:"+collectionId,
                    fragment: collectionFragment
                });
                fragmentResult.timestamps.push(addTimestamp)
                cache.writeFragment({
                    id: "TimestampCollection:"+collectionId,
                    fragment: collectionFragment,
                    data: fragmentResult
                });
            }}
            errorToMessage={(error) => {
                if(error.graphQLErrors && error.graphQLErrors.length >0){
                    const userInputError = error.graphQLErrors.find((gqlError) => {
                        return gqlError.extensions.code === 'BAD_USER_INPUT';
                    });
                    if(userInputError){
                        return userInputError.message;
                    }
                }
                return error.message;
            }}
            {...rest}
        >
        </MutationWithError>
    )
}


const UPDATE_TIMESTAMP = gql`
    mutation UpdateTimestamp($collectionId: String!, $timestampId: String!, $title: String, $time: Float, $bpm: Float){
        updateTimestamp(collectionId: $collectionId, timestampId: $timestampId, title: $title, time:$time, bpm:$bpm){
            id
            title
            time
            bpm
        }
    }
`;

export const UpdateTimestampMutation = (props) => {
    return (
        <MutationWithError mutation={UPDATE_TIMESTAMP} {...props} />
    );
}

const DELETE_TIMESTAMP = gql`
    mutation DeleteTimestamp($collectionId: String!, $timestampId: String!){
        deleteTimestamp(collectionId: $collectionId, timestampId: $timestampId){
            id
            title
            time
            bpm
        }
    }
`;

export const DeleteTimestampMutation = (props) => {
    const {collectionId, ...rest} = props;
    return(
        <MutationWithError 
            mutation={DELETE_TIMESTAMP} 
            update={
                (cache, { data: { deleteTimestamp } }) => {
                    var fragmentResult = cache.readFragment({
                        id: "TimestampCollection:"+collectionId,
                        fragment: collectionFragment
                    })
                    fragmentResult.timestamps = deleteTimestamp
                    cache.writeFragment({
                        id: "TimestampCollection:"+collectionId,
                        fragment: collectionFragment,
                        data: fragmentResult
                    });
                }
            }
            {...rest}
        />
    )
}