const moviesService = require('../services/moviesService');
const StandardApiGen = require('./StandardApiGen');

const {
    createMovieSchema,
    updateMovieSchema,
} = require('../utils/schemas/movieSchema');

const moviesApiGen = new StandardApiGen({
    service: moviesService,
    createItemSchema: createMovieSchema,
    updateItemSchema: updateMovieSchema,
});

module.exports = moviesApiGen.genRouter();
