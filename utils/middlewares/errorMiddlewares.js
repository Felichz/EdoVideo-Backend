const debug = require('debug')('app:error');
const config = require('../../config');
const boom = require('@hapi/boom');

function logErrors(err, req, res, next) {
    debug('Error Logger: \n', err);
    next(err);
}

function wrapErrors(err, req, res, next) {
    if (err.isBoom) {
        next(err);
    } else {
        next(boom.boomify(err, { statusCode: err.status }));
    }
}

function errorHandler(err, req, res, next) {
    const {
        output: { statusCode, payload },
    } = err;

    res.status(statusCode || 500);

    let stack;
    if (config.dev) {
        stack = err.stack;
    }

    res.json({ ...payload, stack });
}

module.exports = {
    logErrors,
    wrapErrors,
    errorHandler,
};
