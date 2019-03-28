const {clearTimestamps} = require('./utils/testHelper');
const {ADD_TIMESTAMP_COLLECTION, ADD_TIMESTAMP, UPDATE_TIMESTAMP, DELETE_TIMESTAMP}  = require('../mutations');
const {FIND_TIMESTAMP_COLLECTION} = require('../queries');
const {createTestClient, closeConnection} = require('./utils/testHelper');

var mutate, query, collectionId, timestampId;

const checkTimestamp = (timestamp, id, title, time, bpm) => {
    expect(timestamp.id).toBe(id);
    expect(timestamp.title).toBe(title);
    expect(timestamp.time).toBe(time);
    expect(timestamp.bpm).toBe(bpm);
};

const includesTimestamp = (timestamps, timestampId) => {
    if(timestamps.length <= 0){
        return false;
    }
    return timestamps.reduce((found, timestamp) => {
        if(timestampId === timestamp.id)
            found = true;
        return found;
    });
};


describe('Testing Timestamps', () =>{
    beforeAll(() => {
        return createTestClient().then( () =>{
            mutate = require('./utils/testHelper').mutate;
            query = require('./utils/testHelper').query;
            clearTimestamps();
            return mutate({
                mutation: ADD_TIMESTAMP_COLLECTION,
                variables: {
                    videoId: '123',
                    title: 'test'
                }
            }).then ((res) => {
                collectionId = res.data.addTimestampCollection.id;
            });
        });
    });
    afterAll(() => {
        closeConnection();
    });
    
    test('should create timestamps', () => {
        return mutate({
            mutation: ADD_TIMESTAMP,
            variables: {
                collectionId,
                title: 'timestamp1',
                time: 1,
                bpm: 120
            }
        }).then( (res) => {
            const timestamp = res.data.addTimestamp;
            checkTimestamp(timestamp, timestamp.id, 'timestamp1', 1, 120);
            expect(timestamp.id).toBeDefined();
            timestampId = timestamp.id;
            expect(res.errors).toBeFalsy();
        });
    });
    test('should find the timestamp in a query', () => {
        return query({
            query: FIND_TIMESTAMP_COLLECTION,
            variables: {
                collectionId
            }
        }).then((res) => {
            const {timestampCollection} = res.data;
            const {timestamps} = timestampCollection;
            const timestamp = timestamps[0];
            checkTimestamp(timestamp, timestamp.id, 'timestamp1', 1, 120);
            expect(res.errors).toBeFalsy();
        });
    });
    test('should not allow duplicate adds for the same time', () => {
        return mutate({
            mutation: ADD_TIMESTAMP,
            variables: {
                collectionId,
                time: 1,
                title: 'timestamp2',
                bpm: 60
            }
        }).then((res) => {
            expect(res.errors.length).toBe(1);
            expect(res.errors[0].originalError.name).toBe('DuplicateAddError');
        });
    });
    test('should update the timestamp', () => {
        return mutate({
            mutation: UPDATE_TIMESTAMP,
            variables: {
                collectionId,
                timestampId,
                title: 'timestamp3',
                time: 3,
                bpm: 180
            }
        }).then( (res) => {
            const timestamp = res.data.updateTimestamp;
            checkTimestamp(timestamp, timestamp.id, 'timestamp3', 3, 180);
            expect(res.errors).toBeFalsy();
            return query({
                query: FIND_TIMESTAMP_COLLECTION,
                variables: {
                    collectionId
                }
            }).then( (res) => {
                const {timestampCollection} = res.data;
                const {timestamps} = timestampCollection;
                const timestamp = timestamps[0];
                checkTimestamp(timestamp, timestamp.id, 'timestamp3', 3, 180);
                expect(res.errors).toBeFalsy();
            });
        });
    });
    test('should delete the timestamp', () => {
        return mutate({
            mutation: DELETE_TIMESTAMP,
            variables: {
                collectionId,
                timestampId
            }
        }).then( (res) => {
            const timestamps = res.data.deleteTimestamp;
            expect(includesTimestamp(timestamps, timestampId)).toBe(false);
            expect(res.errors).toBeFalsy();
            return query({
                mutation: FIND_TIMESTAMP_COLLECTION,
                variables: {
                    collectionId
                }
            }).then((res) => {
                const {timestampCollection} = res.data;
                expect(includesTimestamp(timestampCollection.timestamps, timestampId)).toBe(false);
                expect(res.errors).toBeFalsy();
            });
        });
    });
    test('should not allow double deletion', () => {
        return mutate({
            mutation: DELETE_TIMESTAMP,
            variables: {
                collectionId,
                timestampId
            }
        }).then((res) => {
            expect(res.errors.length).toBe(1);
            expect(res.errors[0].originalError.name).toBe('DocumentNotFoundError');
        });
    });
});