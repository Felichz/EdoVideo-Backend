const proxyquire = require('proxyquire');

const mongoLibMock = require('../../utils/mocks/lib/mongoLibMock');
const categoriesMock = require('../../utils/mocks/data/categoriesMock');

const testStandardServiceMethods = require('./testStandardServiceMethods');

const { collection } = require('../../services/categoriesService');

describe('Services - categories', function () {
    const mongoMock = mongoLibMock(collection, categoriesMock);

    const categoriesService = proxyquire('../../services/categoriesService', {
        './StandardService': proxyquire('../../services/StandardService', {
            '../lib/mongo': mongoMock,
        }),
    });

    testStandardServiceMethods(categoriesService, categoriesMock, mongoMock);
});
