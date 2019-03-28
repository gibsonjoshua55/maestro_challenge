const _ = require('lodash');
const timestampCollectionMutations = require('./timestampCollectionMutations');
const timestampMutations = require('./timestampMutations');

module.exports = _.merge(timestampCollectionMutations, timestampMutations);