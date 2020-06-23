const config = require('./config');
const express = require('express');
const app = express();

// Middlewares
const bodyParser = require('body-parser');
const morgan = require('morgan');

const moviesApi = require('./routes/moviesApi');
const categoriesApi = require('./routes/categoriesApi');

const notFoundHandler = require('./utils/middlewares/notFoundHandler');

const {
    logErrors,
    wrapErrors,
    errorHandler,
} = require('./utils/middlewares/errorMiddlewares');

app.use(morgan('dev'));

// Body Parser
// app.use(express.json());
// app.use('body');
app.use(bodyParser.json());

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
    console.log(`Server listening to port ${config.port}`);
});
