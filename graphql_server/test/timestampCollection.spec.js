const {clearTimestamps} = require('./utils/testHelper');
const {FIND_TIMESTAMP_COLLECTION, FIND_TIMESTAMP_COLLECTIONS}  = require('../queries');
const {ADD_TIMESTAMP_COLLECTION, UPDATE_TIMESTAMP_COLLECTION, DELETE_TIMESTAMP_COLLECTION}  = require('../mutations');
const {createTestClient, closeConnection} = require('./utils/testHelper');

var mutate, query, timestampCollectionId;

describe('Testing Timestamp Collections', () =>{
    beforeAll(() => {
        return createTestClient().then( () => {
            query = require('./utils/testHelper').query;
            mutate = require('./utils/testHelper').mutate;
            return clearTimestamps();
        });
    });
    afterAll(() => {
        closeConnection();
    });

    test('should create a timestamp collection', () => {
        
        
        return mutate({
            mutation: ADD_TIMESTAMP_COLLECTION,
            variables: {
                videoId: '123',
                title: 'test'
            }
        }).then( (res) => {
            const timestampCollection = res.data.addTimestampCollection;
            expect(timestampCollection.videoId).toBe('123');
            expect(timestampCollection.title).toBe('test');
            expect(timestampCollection.id).toBeDefined();
            timestampCollectionId = timestampCollection.id;
            expect(res.errors).toBeFalsy();
        });
    });
    test('should be found through a query', () => {
        return query({
            query: FIND_TIMESTAMP_COLLECTION,
            variables: {
                collectionId: timestampCollectionId
            }
        }).then( (res) => {
            const { timestampCollection } = res.data;
            expect(timestampCollection.videoId).toBe('123');
            expect(timestampCollection.title).toBe('test');
            expect(timestampCollection.id).toBe(timestampCollectionId);
            expect(res.errors).toBeFalsy();
            return query({
                query: FIND_TIMESTAMP_COLLECTIONS,
                variables : {
                    videoId: '123'
                }
            }).then( (res) => {
                const {timestampCollections} = res.data;
                expect(timestampCollections.length).toBe(1);
                const timestampCollection = timestampCollections[0];
                expect(timestampCollection.videoId).toBe('123');
                expect(timestampCollection.title).toBe('test');
                expect(timestampCollection.id).toBe(timestampCollectionId);
                expect(res.errors).toBeFalsy();
            });
        });
    });
    test('should not allow duplicate adds for the same videoID/title', () => {
        return mutate({
            mutation: ADD_TIMESTAMP_COLLECTION,
            variables : {
                videoId: '123',
                title: 'test'
            }
        }).then((res => {
            expect(res.errors.length).toBe(1);
            expect(res.errors[0].originalError.name).toBe('DuplicateAddError');
        }));
    });
    test('should update title', () => {
        return mutate({
            mutation: UPDATE_TIMESTAMP_COLLECTION,
            variables: {
                collectionId: timestampCollectionId,
                title: 'new_title'
            }
        }).then((res => {
            const timestampCollection = res.data.updateTimestampCollection;
            expect(timestampCollection.id).toBe(timestampCollectionId);
            expect(timestampCollection.videoId).toBe('123');
            expect(timestampCollection.title).toBe('new_title');
            expect(res.errors).toBeFalsy();
        }))
    })
    test('should be deleted through a mutation', () => {
        return mutate({
            mutation: DELETE_TIMESTAMP_COLLECTION,
            variables: {
                collectionId: timestampCollectionId
            }
        }).then( (res) => {
            const status = res.data.deleteTimestampCollection.status;
            expect(res.errors).toBeFalsy();
        });
    });
    test('should no longer exist', () => {
        return query({
            query: FIND_TIMESTAMP_COLLECTION,
            variables: {
                collectionId: timestampCollectionId
            }
        }).then( (res) => {
            expect(res.errors.length).toBe(1);
            expect(res.errors[0].originalError.name).toBe('DocumentNotFoundError');
        });
    });
    test('should not allow double deletion', () => {
        return mutate({
            mutation: DELETE_TIMESTAMP_COLLECTION,
            variables: {
                collectionId: timestampCollectionId
            }
        }).then( (res) => {
            expect(res.errors.length).toBe(1);
            expect(res.errors[0].originalError.name).toBe('DocumentNotFoundError');
        });
    });
});