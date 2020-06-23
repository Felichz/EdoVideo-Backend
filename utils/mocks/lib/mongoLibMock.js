class MongoLibMock {
    constructor(collection, dataMock) {
        this.collection = collection;
        this.dataMock = dataMock;

        this.calledMethods = {
            getAll: false,
            get: false,
            create: false,
            update: false,
            delete: false,
        };

        this.receivedArguments = {
            getAll: [],
            get: [],
            create: [],
            update: [],
            delete: [],
        };
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
