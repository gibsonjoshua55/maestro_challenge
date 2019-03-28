const gql = require('graphql-tag');

const FIND_TIMESTAMP_COLLECTION = gql`
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

const FIND_TIMESTAMP_COLLECTIONS = gql`
    query FindTimestampCollections($videoId: String!){
        timestampCollections(videoId: $videoId){
            id
            videoId
            title
        }
    }
`;

module.exports = { FIND_TIMESTAMP_COLLECTION, FIND_TIMESTAMP_COLLECTIONS};