const gql = require('graphql-tag');

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

const UPDATE_TIMESTAMP = gql`
    mutation UpdateTimestamp($collectionId: String!, $timestampId: String!, $title: String, $time: Float, $bpm: Float){
        updateTimestamp(collectionId: $collectionId, timestampId: $timestampId, title: $title, time:$time, bpm: $bpm){
            id
            title
            time
            bpm
        }
    }
`;

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

module.exports = { ADD_TIMESTAMP, UPDATE_TIMESTAMP, DELETE_TIMESTAMP };