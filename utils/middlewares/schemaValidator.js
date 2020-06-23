const boom = require('@hapi/boom');

function schemaValidator(schema, check = 'body') {
    return function (req, res, next) {
        if (!req[check]) {
            var error = new Error('No given data');
        } else {
            var { error } = schema.validate(req[check]);
        }

        return error ? next(boom.badRequest(error)) : next();
    };
}

module.exports = schemaValidator;
