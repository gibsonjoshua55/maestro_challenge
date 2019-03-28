import React from 'react';
import QueryWithError from './QueryWithError'
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

export const FIND_TIMESTAMP_COLLECTION = gql`
    query FindTimestampCollection($collectionId: String!){
        timestampCollection(collectionId: $collectionId){
            id
            videoId
            title
            timestamps{
                id
                time
                title
                bpm
            }
        }
    }
`;

export const FIND_TIMESTAMP_COLLECTIONS = gql`
    query FindTimestampCollections($videoId: String!){
        timestampCollections(videoId: $videoId){
            id
            videoId
            title
        }
    }
`;


export const FindTimestampCollectionQuery = (props) => {
    const {collectionId, ...rest} = props;
    return (<QueryWithError
        query={FIND_TIMESTAMP_COLLECTION}
        variables={{collectionId}}
        {...rest}
    />);
}

FindTimestampCollectionQuery.propTypes ={
    collectionId: PropTypes.string.isRequired
}




/**
 * @param {*} props:
 *  - variables: {
 *      videoId: String
 * } 
 */
export const FindTimestampCollectionsQuery = (props) => {
    const {videoId, children, ...rest} = props;
    return (<QueryWithError
        query={FIND_TIMESTAMP_COLLECTIONS}
        variables={{videoId}}
        queryKey={'FIND_TIMESTAMP_COLLECTION_QUERIES'}
        children={children}
        {...rest}
    />);
}

FindTimestampCollectionsQuery.propTypes = {
    videoId: PropTypes.string.isRequired
}
