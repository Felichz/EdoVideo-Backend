class MongoLibMock {
    constructor(collection, dataMock) {
        this.collection = collection;
        this.dataMock = dataMock;

        this.calledMethods = {};

        this.receivedArguments = {};
    }

    getAll(collection) {
        this.calledMethods.getAll = true;
        this.receivedArguments.getAll = [...arguments];

        return this.dataMock;
    }

    get(collection, id) {
        this.calledMethods.get = true;
        this.receivedArguments.get = [...arguments];

        return this.dataMock[0];
    }

    create(collection) {
        this.calledMethods.create = true;
        this.receivedArguments.create = [...arguments];

        return {
            insertedId: '5eebd63d77910ba1d2e5f9c9',
        };
    }

    update(id, item) {
        this.calledMethods.update = true;
        this.receivedArguments.update = [...arguments];

        return { matchedCount: 1, modifiedCount: 1 };
    }

    delete(id) {
        this.calledMethods.delete = true;
        this.receivedArguments.delete = [...arguments];

        return { deletedCount: 1 };
    }

    /// 222... Correspond to the id of a non-existent item

    getWithProjection(collection, id, projectionObj) {
        this.calledMethods.getWithProjection = true;
        this.receivedArguments.getWithProjection = [...arguments];

        if (id === '222222222222222222222222') {
            return null;
        }

        return { _id: id };
    }

    pushToArray(collection, id, arrayName, data) {
        this.calledMethods.pushToArray = true;
        this.receivedArguments.pushToArray = [...arguments];

        return { matchedCount: 1, modifiedCount: 1 };
    }

    pullFromArray(collection, id, arrayName, pullId) {
        this.calledMethods.pullFromArray = true;
        this.receivedArguments.pullFromArray = [...arguments];

        return { matchedCount: 1, modifiedCount: 1 };
    }

    isCalled(func) {
        const called = this.calledMethods[func];
        this.calledMethods[func] = false;
        return called;
    }
}

function mongoLibMock(collection, dataMock) {
    return new MongoLibMock(collection, dataMock);
}

module.exports = mongoLibMock;
