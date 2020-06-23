const joi = require('@hapi/joi');

const limitYear = new Date().getFullYear() + 1;

const movieSchemaItems = {
    title: joi.string().max(80),
    type: joi.string().max(25),
    language: joi.string().max(25),
    year: joi.number().min(1888).max(limitYear),
    contentRating: joi.string().max(5),
    duration: joi.number().max(300),
    cover: joi.string().uri(),
    description: joi.string().max(1000),
    source: joi.string().uri(),
};

const movieSchemaItemsRequired = {};

for (property in movieSchemaItems) {
    movieSchemaItemsRequired[property] = movieSchemaItems[property].required();
}

const createMovieSchema = joi.object(movieSchemaItemsRequired);
const updateMovieSchema = joi.object(movieSchemaItems).min(1);

module.exports = {
    createMovieSchema,
    updateMovieSchema,
};
