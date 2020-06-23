const testStandardApiMethods = require('./testStandardApiMethods');
const createTestServer = require('./createTestServer');
const CategoryServiceMock = require('../../utils/mocks/services/CategoryServiceMock');
const {
    categoriesMock,
    badIdCategoryMock,
} = require('../../utils/mocks/data/categoriesMock');
const proxyquire = require('proxyquire');

describe('Routes - categories', function () {
    const categoriesApi = proxyquire('../../routes/categoriesApi', {
        '../services/categoriesService': new CategoryServiceMock(),
    });

    testStandardApiMethods(categoriesApi, categoriesMock);

    const request = createTestServer(categoriesApi);

    describe('Create category with an invalid video inside', function () {
        it('responds with a 400 status code', function (done) {
            request.post('/').send(badIdCategoryMock[0]).expect(400, done);
        });
    });

    describe('Create category with an invalid json inside', function () {
        it('responds with a 400 status code', function (done) {
            request
                .post('/')
                .send('{"invalid"}')
                .type('json')
                .expect(400, done);
        });
    });

    describe('Push videos', function () {
        describe('Push video', function () {
            it('responds with a 201 status code', function (done) {
                request
                    .post('/5eebd67177910ba1d2e5f9fd/movies')
                    .send({
                        id: '5eebd63d77910ba1d2e5f9f9',
                    })
                    .expect(201, done);
            });
        });

        describe('Push video into a category with an invalid id', function () {
            it('responds with a 400 status code', function (done) {
                request
                    .post('/123/movies')
                    .send({
                        id: '5eebd63d77910ba1d2e5f9f9',
                    })
                    .expect(400, done);
            });
        });

        describe('Push video with an invalid json', function () {
            it('responds with a 400 status code', function (done) {
                request
                    .post('/5eebd67177910ba1d2e5f9fd/movies')
                    .send('{"invalid"}')
                    .type('json')
                    .expect(400, done);
            });
        });

        describe('Push a video to a non-existent category', function () {
            it('responds with a 404 status code', function (done) {
                request
                    .post('/222222222222222222222222/movies')
                    .send({
                        id: '5eebd63d77910ba1d2e5f9f9',
                    })
                    .expect(404, done);
            });
        });

        describe('Push video with an invalid id', function () {
            it('responds with a 400 status code', function (done) {
                request
                    .post('/5eebd67177910ba1d2e5f9fd/movies')
                    .send({
                        id: '123',
                    })
                    .expect(400, done);
            });
        });

        describe('Push repeated video', function () {
            it('responds with a 201 status code', function (done) {
                request
                    .post('/5eebd67177910ba1d2e5f9fd/movies')
                    .send({
                        id: '111111111111111111111111',
                    })
                    .expect(201, done);
            });
        });

        describe('Push a non-existent video', function () {
            it('responds with a 400 status code', function (done) {
                request
                    .post('/5eebd67177910ba1d2e5f9fd/movies')
                    .send({
                        id: '222222222222222222222222',
                    })
                    .expect(400, done);
            });
        });
    });

    describe('Pull videos', function () {
        describe('Pull video', function () {
            it('responds with a 200 status code', function (done) {
                request
                    .delete('/5eebd67177910ba1d2e5f9fd/movies')
                    .send({
                        id: '5eebd63d77910ba1d2e5f9f9',
                    })
                    .expect(200, done);
            });
        });

        describe('Pull video into a category with an invalid id', function () {
            it('responds with a 400 status code', function (done) {
                request
                    .delete('/123/movies')
                    .send({
                        id: '5eebd63d77910ba1d2e5f9f9',
                    })
                    .expect(400, done);
            });
        });

        describe('Pull video with an invalid json', function () {
            it('responds with a 400 status code', function (done) {
                request
                    .delete('/5eebd67177910ba1d2e5f9fd/movies')
                    .send('{"invalid"}')
                    .type('json')
                    .expect(400, done);
            });
        });

        describe('Pull a video to a non-existent category', function () {
            it('responds with a 404 status code', function (done) {
                request
                    .delete('/222222222222222222222222/movies')
                    .send({
                        id: '5eebd63d77910ba1d2e5f9f9',
                    })
                    .expect(404, done);
            });
        });

        describe('Pull video with an invalid id', function () {
            it('responds with a 400 status code', function (done) {
                request
                    .delete('/5eebd67177910ba1d2e5f9fd/movies')
                    .send({
                        id: '123',
                    })
                    .expect(400, done);
            });
        });

        describe('Pull a non-existent video', function () {
            it('responds with a 400 status code', function (done) {
                request
                    .delete('/5eebd67177910ba1d2e5f9fd/movies')
                    .send({
                        id: '222222222222222222222222',
                    })
                    .expect(400, done);
            });
        });
    });
});
