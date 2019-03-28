const { DuplicateAddError, DocumentNotFoundError } = require('./errors');

module.exports =
    (testing) => {
        const connectors = require('../connectors');
        return connectors.setup(testing).then( () => {
            const TimestampCollections = connectors.TimestampCollections;
            const {ObjectID} =  require('mongodb');

            return {
                Query: {
                    timestampCollections(_, {videoId}) {
                        return TimestampCollections.find({videoId: videoId}).then(
                            (timestampCollections) => timestampCollections
                        );
                    },
                    timestampCollection(_, {collectionId}){
                        return TimestampCollections.findOne({id: collectionId}).then(
                            (timestampCollection) => {
                                if(timestampCollection)
                                    return timestampCollection;
                                else
                                    throw new DocumentNotFoundError(`The Timestamp Collection with id ${collectionId} could not be found`);
                            }
                        );
                    }
                },
                Mutation: {
                    addTimestampCollection(_, {videoId, title}){
                        return TimestampCollections.findOne({videoId, title}).then(
                            (foundTimestampCollection) => {
                                if(foundTimestampCollection) {
                                    throw new DuplicateAddError('The Timestamp Collection already exists');
                                }
                                else {
                                    const timestampCollection = new TimestampCollections(
                                        {
                                            id: ObjectID(),
                                            videoId,
                                            title,
                                            timestamps: []
                                        }
                                    );
                                    return timestampCollection.save().then((savedObj)=>{
                                        return savedObj;
                                    }); 
                                }
                            }
                        );
                        
                    },
                    deleteTimestampCollection(_, {collectionId}){
                        return TimestampCollections.findOneAndDelete({id: collectionId}).then( (res)=> {
                            if(res)
                                return res;
                            else
                                throw new DocumentNotFoundError(`The Timestamp Collection with id ${collectionId} could not be found for deletion`);
                        });
                    },
                    updateTimestampCollection(_, {collectionId, title}){
                        const updateValues = {};
                        updateValues['title'] = title;
                        
                        return TimestampCollections.findOneAndUpdate(
                            { id: collectionId},
                            updateValues,
                            {new: true}
                        ).then((result) => {
                            return result;
                        });
                    },
                    addTimestamp(_, {collectionId, title, time, bpm}){
                        return TimestampCollections.findOne({id: collectionId}).then(
                            (collection) => {
                                collection.timestamps.forEach((timestamp) => {
                                    if(timestamp.time == time){
                                        throw new DuplicateAddError(
                                            'A timestamp with the given time already exists',
                                            undefined,
                                            {
                                                invalidArgs: 'time'
                                            });
                                    }
                                });
                                const timestamp = {id: ObjectID(), title, time, bpm};
                                collection.timestamps.push(timestamp);
                                return collection.save().then(
                                    () => {
                                        return timestamp;
                                    });
                            });
                    },
                    updateTimestamp(_, {collectionId, timestampId, title, time, bpm} ){
                        const updateValues = {};
                        if(title){
                            updateValues['timestamps.$.title'] = title;
                        }
                        if(time){
                            updateValues['timestamps.$.time'] = time;
                        }
                        if(bpm){
                            updateValues['timestamps.$.bpm'] = bpm;
                        }
                        return TimestampCollections.findOneAndUpdate(
                            { id: collectionId, 'timestamps.id': timestampId},
                            updateValues,
                            {new: true}
                        ).then((result) => {
                            const timestamp = result.timestamps.find((value) => {
                                return value.id == timestampId;
                            });
                            return timestamp;
                        });
                    },
                    deleteTimestamp(_, {collectionId, timestampId}){
                        return TimestampCollections.findOne({id: collectionId}).then(
                            (collection) => {
                                if (collection === undefined) {
                                    throw new DocumentNotFoundError(`The Timestamp Collection with id ${collectionId} could not be found`);
                                }
                                let found = false;
                                collection.timestamps =  collection.timestamps.filter(timestamp => {
                                    if (timestamp.id.toString() !== timestampId) {
                                        return true;
                                    }
                                    found = true;
                                    return false;
                                });
                                if (found) {
                                    return collection.save().then(() => {
                                        return collection.timestamps;
                                    });
                                } 
                                else {
                                    throw new DocumentNotFoundError(`The Timestamp with id ${timestampId} could not be found`);
                                }
                            });
                    }
                },
            };

        });
    };