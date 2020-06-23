const StandardServiceMock = require('./StandardServiceMock');
const { categoriesMock } = require('../data/categoriesMock');

class CategoryServiceMock extends StandardServiceMock {
    constructor() {
        super(categoriesMock);
    }

    pushMovie(categoryId, movieId) {
        /// 111... Should correspond to the id of a repeated item
        /// 222... Should correspond to the id of a non-existent item

        if (categoryId === '222222222222222222222222') {
            return { matchedCount: 0, modifiedCount: 0 };
        }

        if (movieId === '111111111111111111111111') {
            return { matchedCount: 1, modifiedCount: 0 };
        }

        if (movieId === '222222222222222222222222') {
            return null;
        }

        return { matchedCount: 1, modifiedCount: 1 };
    }

    pullMovie(categoryId, movieId) {
        if (categoryId === '222222222222222222222222') {
            return { matchedCount: 0, modifiedCount: 0 };
        }

        if (movieId === '222222222222222222222222') {
            return { matchedCount: 1, modifiedCount: 0 };
        }

        return { matchedCount: 1, modifiedCount: 1 };
    }
}

module.exports = CategoryServiceMock;
