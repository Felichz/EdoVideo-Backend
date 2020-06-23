const debug = require('debug')('app:server');
const config = require('./config');
const express = require('express');

// Import middlewares

// Security
var helmet = require('helmet');

// Http request logger
const morgan = require('morgan');

const moviesApi = require('./routes/moviesApi');
const categoriesApi = require('./routes/categoriesApi');

const notFoundHandler = require('./utils/middlewares/notFoundHandler');

const {
    logErrors,
    wrapErrors,
    errorHandler,
} = require('./utils/middlewares/errorMiddlewares');

// Initialize app router
const app = express();

// Use middlewares

app.use(helmet());

app.use(morgan('dev'));

// Body Parser
app.use(express.json());

app.use('/api/movies', moviesApi);
app.use('/api/categories', categoriesApi);

// If there is no route match, then we send a 404 response
app.use(notFoundHandler);

// We must put the error middlewares at the end so they
// can catch the errors after they occur.
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
    debug(`Server listening to port ${config.port}`);
});
