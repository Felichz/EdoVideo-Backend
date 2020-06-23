const assert = require('assert');
const createTestServer = require('./createTestServer');

function testStandardApiMethods(apiRouter, dataMock) {
    const request = createTestServer(apiRouter);

    describe('Standard CRUD requests', function () {
        describe('Create', function () {
            describe('Create item', function () {
                it('responds with a 201 status code', function (done) {
                    request.post('/').send(dataMock[0]).expect(201, done);
                });
            });

            describe('Send an invalid json', function () {
                it('responds with a 400 status code', function (done) {
                    request.post('/').send('text').expect(400, done);
                });
            });
        });

        describe('Read', function () {
            describe('Get all items', function () {
                it('responds with a 200 status code', function (done) {
                    request.get('/').expect(200, done);
                });

                it('responds with item list', function (done) {
                    request.get('/').end((err, res) => {
                        assert.deepEqual(res.body, {
                            data: dataMock,
                            message: 'Items listed',
                        });

                        done();
                    });
                });
            });

            describe('Get specific item', function () {
                it('responds with a 200 status code', function (done) {
                    request.get('/5eebd63d77910ba1d2e5f9c9').expect(200, done);
                });
            });

            describe('Get specific item with an invalid id', function () {
                it('responds with a 400 status code', function (done) {
                    request.get('/123').expect(400, done);
                });
            });

            describe('Get specific item that does not exist', function () {
                it('responds with a 404 status code', function (done) {
                    request.get('/222222222222222222222222').expect(404, done);
                });
            });
        });

        describe('Update', function () {
            describe('Update item', function () {
                it('responds with a 200 status code', function (done) {
                    request
                        .put('/5eebd63d77910ba1d2e5f9c9')
                        .send(dataMock[0])
                        .expect(200, done);
                });
            });

            describe('Update item with an invalid id', function () {
                it('responds with a 400 status code', function (done) {
                    request.put('/123').send(dataMock[0]).expect(400, done);
                });
            });

            describe('Send an invalid json', function () {
                it('responds with a 400 status code', function (done) {
                    request
                        .put('/5eebd63d77910ba1d2e5f9c9')
                        .send('{"invalid"}')
                        .type('json')
                        .type('json')
                        .expect(400, done);
                });
            });

            describe('update equivalent item', function () {
                it('responds with a 200 status code', function (done) {
                    request
                        .put('/111111111111111111111111')
                        .send(dataMock[0])
                        .expect(200, done);
                });
            });

            describe('Update non-existent item', function () {
                it('responds with a 404 status code', function (done) {
                    request
                        .put('/222222222222222222222222')
                        .send(dataMock[0])
                        .expect(404, done);
                });
            });
        });

        describe('Delete', function () {
            describe('Delete item', function () {
                it('responds with a 200 status code', function (done) {
                    request
                        .delete('/5eebd63d77910ba1d2e5f9c9')
                        .expect(200, done);
                });
            });

            describe('Delete item with an invalid id', function () {
                it('responds with a 400 status code', function (done) {
                    request.delete('/123').expect(400, done);
                });
            });

            describe('Delete non-existent item', function () {
                it('responds with a 404 status code', function (done) {
                    request
                        .delete('/222222222222222222222222')
                        .expect(404, done);
                });
            });
        });
    });
}

module.exports = testStandardApiMethods;
