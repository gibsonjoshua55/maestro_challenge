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

const DELETE_TIMESTAMP_COLLECTION = gql`
    mutation DeleteTimestampCollection($collectionId: String!){
        deleteTimestampCollection(collectionId: $collectionId){
            id
            videoId
            title
        }
    }
`;

const UPDATE_TIMESTAMP_COLLECTION = gql`
    mutation UpdateTimestampCollection($collectionId: String!, $title: String!){
        updateTimestampCollection(collectionId: $collectionId, title: $title){
            id
            videoId
            title
        }
    }
`;

module.exports = { ADD_TIMESTAMP_COLLECTION, DELETE_TIMESTAMP_COLLECTION, UPDATE_TIMESTAMP_COLLECTION };