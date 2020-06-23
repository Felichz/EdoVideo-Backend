const proxyquire = require('proxyquire');

const mongoLibMock = require('../../utils/mocks/lib/mongoLibMock');
const moviesMock = require('../../utils/mocks/data/moviesMock');

const testStandardServiceMethods = require('./testStandardServiceMethods');

const { collection } = require('../../services/moviesService');

describe('Services - movies', function () {
    const mongoMock = mongoLibMock(collection, moviesMock);

    const moviesService = proxyquire('../../services/moviesService', {
        './StandardService': proxyquire('../../services/StandardService', {
            '../lib/mongo': mongoMock,
        }),
    });

    testStandardServiceMethods(moviesService, moviesMock, mongoMock);
});
