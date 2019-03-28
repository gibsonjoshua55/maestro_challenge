const { gql } = require('apollo-server');

module.exports =  gql`
    type TimestampCollection {
        id: String!
        title: String!
        videoId: String!
        timestamps: [Timestamp]
    }
    type Timestamp {
        id: String!
        time: Float!
        title: String!
        bpm: Float
    }
    type Status {
        status: String!
    }
    # the schema allows the following query:
    type Query {
        timestampCollections(videoId: String!): [TimestampCollection]
        timestampCollection(collectionId: String!): TimestampCollection
    }
    # this schema allows the following mutation:
    type Mutation {
        addTimestamp(
            collectionId: String!
            title: String!
            time: Float!
            bpm: Float
        ): Timestamp
        updateTimestamp(
            collectionId: String!
            timestampId: String!
            title: String
            time: Float
            bpm: Float
        ): Timestamp!
        addTimestampCollection(
            videoId: String!
            title: String!
        ): TimestampCollection
        deleteTimestampCollection(
            collectionId: String!
        ): TimestampCollection
        updateTimestampCollection(
            collectionId: String!
            title: String!
        ): TimestampCollection
        deleteTimestamp(
            collectionId: String!
            timestampId: String!
        ): [Timestamp]
    }
`;