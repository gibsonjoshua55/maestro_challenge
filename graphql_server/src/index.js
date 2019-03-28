require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/typeDefs');
require('./schema/resolvers')(process.env.NODE_ENV === 'test').then((resolvers) => {
    // In the most basic sense, the ApolloServer can be started
    // by passing type definitions (typeDefs) and the resolvers
    // responsible for fetching the data for those types.
    const server = new ApolloServer({ typeDefs, resolvers });

    // This `listen` method launches a web-server.  Existing apps
    // can utilize middleware options, which we'll discuss later.
    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
}, (err) => {
    console.error('Could not connect to MongoDB instance');
    console.error(err);
});

