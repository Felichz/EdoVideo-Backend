const StandardService = require('./StandardService');

class CategoriesService extends StandardService {
    constructor() {
        super('categories');
        this.movieCollection = 'videos';
        this.movieArray = 'videos';
    }

    async pushMovie(categoryId, movieId) {
        const movieData = await this.mongo.getWithProjection(
            this.movieCollection,
            movieId,
            { _id: 1 }
        );

        if (movieData) {
            const pushOutput = await this.mongo.pushToArray(
                this.collection,
                categoryId,
                this.movieArray,
                movieData
            );

            return pushOutput;
        } else {
            return null;
        }
    }

    async pullMovie(categoryId, movieId) {
        const pullOutput = await this.mongo.pullFromArray(
            this.collection,
            categoryId,
            this.movieArray,
            movieId
        );

        return pullOutput;
    }
}

module.exports = new CategoriesService();
