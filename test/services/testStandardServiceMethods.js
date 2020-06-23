const assert = require('assert');

function testStandardServiceMethods(service, dataMock, mongoMock) {
    const collection = service.collection;

    describe('Get all items', function () {
        it('getAll method of mongoLib is called', async () => {
            await service.getAll();
            assert(mongoMock.isCalled('getAll'));
        });

        it('collection passed as parameter to mongo getAll method', async () => {
            await service.getAll();
            assert(mongoMock.receivedArguments.getAll.includes(collection));
        });

        it('returns the mongo output', async () => {
            const result = await service.getAll();
            const expected = dataMock;

            assert.deepEqual(result, expected);
        });
    });

    describe('Get specific item', function () {
        it('get method of mongoLib is called', async () => {
            await service.get('some id');
            assert(mongoMock.isCalled('get'));
        });

        it('collection and id are passed as parameters to mongo get method', async () => {
            await service.get('some id');
            assert(mongoMock.receivedArguments.get.includes(collection));

            assert(mongoMock.receivedArguments.get.includes('some id'));
        });

        it('returns the mongo output', async () => {
            const result = await service.get('some id');
            const expected = dataMock[0];

            assert.deepEqual(result, expected);
        });
    });

    describe('Create item', function () {
        it('create method of mongoLib is called', async () => {
            await service.create(dataMock[0]);
            assert(mongoMock.isCalled('create'));
        });

        it('collection and item are passed as parameters to mongo create method', async () => {
            await service.create(dataMock[0]);
            assert(mongoMock.receivedArguments.create.includes(collection));

            assert(mongoMock.receivedArguments.create.includes(dataMock[0]));
        });

        it('returns the mongo output', async () => {
            const result = await service.create(dataMock[0]);

            assert('insertedId' in result);
        });
    });

    describe('Update item', function () {
        it('update method of mongoLib is called', async () => {
            await service.update('some id', dataMock[0]);
            assert(mongoMock.isCalled('update'));
        });

        it('collection, id, and item are passed as parameters to mongo update method', async () => {
            await service.update('some id', dataMock[0]);
            assert(mongoMock.receivedArguments.update.includes(collection));

            assert(mongoMock.receivedArguments.update.includes('some id'));

            assert(mongoMock.receivedArguments.update.includes(dataMock[0]));
        });

        it('returns the mongo output', async () => {
            const result = await service.update('some id', dataMock[0]);
            const expected = { matchedCount: 1, modifiedCount: 1 };

            assert.deepEqual(result, expected);
        });
    });

    describe('Delete item', function () {
        it('delete method of mongoLib is called', async () => {
            await service.delete('some id');
            assert(mongoMock.isCalled('delete'));
        });

        it('collection and id are passed as parameters to mongo delete method', async () => {
            await service.delete('some id');
            assert(mongoMock.receivedArguments.delete.includes(collection));

            assert(mongoMock.receivedArguments.delete.includes('some id'));
        });

        it('returns the mongo output', async () => {
            const result = await service.delete('some id');
            const expected = { deletedCount: 1 };

            assert.deepEqual(result, expected);
        });
    });
}

module.exports = testStandardServiceMethods;
