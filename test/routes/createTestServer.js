const express = require('express');
const createRequester = require('supertest');
const {
    wrapErrors,
    errorHandler,
} = require('../../utils/middlewares/errorMiddlewares');

function createTestServer(apiRouter) {
    const app = express();
    app.use(express.json());
    app.use(apiRouter);
    // app.use(notFoundHandler);
    app.use(wrapErrors);
    app.use(errorHandler);

    // This will create a Supertest object to send HTTP requests
    return createRequester(app);
}

module.exports = createTestServer;
