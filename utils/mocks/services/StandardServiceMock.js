class StandardServiceMock {
    constructor(dataMock) {
        this.dataMock = dataMock;
    }

    getAll() {
        return this.dataMock;
    }

    get(id) {
        if (id === '222222222222222222222222') {
            return null;
        }

        return this.dataMock[0];
    }

    create() {
        return {
            insertedId: '5eebd63d77910ba1d2e5f9c9',
        };
    }

    update(id) {
        if (id === '111111111111111111111111') {
            return { matchedCount: 1, modifiedCount: 0 };
        }

        if (id === '222222222222222222222222') {
            return { matchedCount: 0, modifiedCount: 0 };
        }

        return { matchedCount: 1, modifiedCount: 1 };
    }

    delete(id) {
        if (id === '222222222222222222222222') {
            return { deletedCount: 0 };
        }

        return { deletedCount: 1 };
    }
}

module.exports = StandardServiceMock;
