const joi = require('@hapi/joi');

const hexIdSchema = joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({ 'string.pattern.base': 'Invalid id' });

const hexIdObjectSchema = joi.object({
    id: hexIdSchema,
});

module.exports = { hexIdObjectSchema, hexIdSchema };
