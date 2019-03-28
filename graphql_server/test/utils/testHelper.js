require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const { createTestClient } = require('apollo-server-testing');
const typeDefs = require('../../src/schema/typeDefs');
const setupResolvers = require('../../src/schema/resolvers')(true);
var Mongoose;

module.exports = {
    createTestClient: () => {
        return setupResolvers.then((resolvers) => {
            const connectors = require('../../src/connectors');
            module.exports.TimestampCollections = connectors.TimestampCollections;
            Mongoose = connectors.Mongoose;
        
            module.exports.server = new ApolloServer({ typeDefs, resolvers });
            const {mutate, query} = createTestClient(module.exports.server);
            module.exports.mutate = mutate;
            module.exports.query = query;
            
        });
    },
    clearTimestamps: () => {
        if(Mongoose.connection.collections['timestamps']){
            Mongoose.connection.collections['timestamps'].drop();
        }
    },
    closeConnection: () => {
        Mongoose.connection.close();
    }
};