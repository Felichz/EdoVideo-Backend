const { config } = require('./config');
const express = require('express');
const app = express();
const { moviesApi } = require('./routes/movies');

app.use('/api/movies', moviesApi);

app.listen(config.port, function () {
    console.log(`Server listening to port ${config.port}`);
});
