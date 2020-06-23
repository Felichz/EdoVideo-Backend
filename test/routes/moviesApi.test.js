const testStandardApiMethods = require('./testStandardApiMethods');
const StandardServiceMock = require('../../utils/mocks/services/StandardServiceMock');
const moviesMock = require('../../utils/mocks/data/moviesMock');
const proxyquire = require('proxyquire');

describe('Routes - movies', function () {
    const moviesApi = proxyquire('../../routes/moviesApi', {
        '../services/moviesService': new StandardServiceMock(moviesMock),
    });

    testStandardApiMethods(moviesApi, moviesMock);
});
