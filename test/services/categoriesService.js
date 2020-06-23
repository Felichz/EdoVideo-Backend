const assert = require('assert');
const proxyquire = require('proxyquire');

const mongoLibMock = require('../../utils/mocks/lib/mongoLibMock');
const categoriesMock = require('../../utils/mocks/data/categoriesMock');

const testStandardServiceMethods = require('./testStandardServiceMethods');

const {
    collection,
    movieCollection,
    movieArray,
} = require('../../services/categoriesService');

describe('Services - categories', function () {
    const mongoMock = mongoLibMock(collection, categoriesMock);

    const categoriesService = proxyquire('../../services/categoriesService', {
        './StandardService': proxyquire('../../services/StandardService', {
            '../lib/mongo': mongoMock,
        }),
    });

    testStandardServiceMethods(categoriesService, categoriesMock, mongoMock);

    describe('Push movie to array', function () {
        it('getWithProjection method of mongoLib is called', async () => {
            await categoriesService.pushMovie('category id', 'movie id');
            assert(mongoMock.isCalled('getWithProjection'));
        });

        it('movieCollection, movieId, and projectionObj are passed as parameters to mongo getWithProjection method', async () => {
            await categoriesService.pushMovie('category id', 'movie id');
            assert(
                mongoMock.receivedArguments.getWithProjection.includes(
                    movieCollection
                )
            );

            assert(
                mongoMock.receivedArguments.getWithProjection.includes(
                    'movie id'
                )
            );

            const projectionObj = { _id: 1 };
            assert(
                mongoMock.receivedArguments.getWithProjection.find(
                    (arg) =>
                        JSON.stringify(arg) === JSON.stringify(projectionObj)
                )
            );
        });

        it('pushToArray method of mongoLib is called', async () => {
            await categoriesService.pushMovie('category id', 'movie id');
            assert(mongoMock.isCalled('pushToArray'));
        });

        it('collection, categoryId, movieArray, and movieData are passed as parameters to mongo pushToArray method', async () => {
            await categoriesService.pushMovie('category id', 'movie id');
            assert(
                mongoMock.receivedArguments.pushToArray.includes(collection)
            );

            assert(
                mongoMock.receivedArguments.pushToArray.includes('category id')
            );

            assert(
                mongoMock.receivedArguments.pushToArray.includes(movieArray)
            );

            const movieData = {
                _id: 'movie id',
            };

            assert(
                mongoMock.receivedArguments.pushToArray.find(
                    (arg) => JSON.stringify(arg) === JSON.stringify(movieData)
                )
            );
        });

        it('returns the mongo output', async () => {
            const result = await categoriesService.pushMovie(
                'category id',
                'movie id'
            );
            const expected = { matchedCount: 1, modifiedCount: 1 };

            assert.deepEqual(result, expected);
        });

        it('returns null if try to push a non-existent movie', async () => {
            const result = await categoriesService.pushMovie(
                'category id',
                '222222222222222222222222'
            );
            const expected = null;

            assert.deepEqual(result, expected);
        });
    });

    describe('Pull movie from array', function () {
        it('pullFromArray method of mongoLib is called', async () => {
            await categoriesService.pullMovie('category id', 'movie id');
            assert(mongoMock.isCalled('pullFromArray'));
        });

        it('collection, categoryId, movieArray, and movieId are passed as parameters to mongo pullFromArray method', async () => {
            await categoriesService.pullMovie('category id', 'movie id');
            assert(
                mongoMock.receivedArguments.pullFromArray.includes(collection)
            );

            assert(
                mongoMock.receivedArguments.pullFromArray.includes(
                    'category id'
                )
            );

            assert(
                mongoMock.receivedArguments.pullFromArray.includes(movieArray)
            );

            assert(
                mongoMock.receivedArguments.pullFromArray.includes('movie id')
            );
        });

        it('returns the mongo output', async () => {
            const result = await categoriesService.pullMovie(
                'category id',
                'movie id'
            );
            const expected = { matchedCount: 1, modifiedCount: 1 };

            assert.deepEqual(result, expected);
        });
    });
});
