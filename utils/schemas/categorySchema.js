const joi = require('@hapi/joi');
const { hexIdSchema } = require('./hexIdSchema');

const nameSchema = joi.string().max(30);
const videosSchema = joi.array().items(joi.object({ _id: hexIdSchema }));

const createCategorySchema = joi.object({
    name: nameSchema.required(),
    videos: videosSchema,
});

const updateCategorySchema = joi.object({
    name: nameSchema,
    videos: videosSchema,
});

module.exports = {
    createCategorySchema,
    updateCategorySchema,
};
