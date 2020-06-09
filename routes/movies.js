const express = require('express');
const moviesMock = require('../utils/mocks/moviesMock');
const { getMovieById } = require('../utils/queries');

const moviesApi = express.Router();

moviesApi.get('/', async (req, res, next) => {
    try {
        const movies = await Promise.resolve(moviesMock);

        res.status(200).json({
            data: movies,
            message: 'Movies listed',
        });
    } catch (err) {
        next(err);
    }
});

moviesApi.get('/:id', async (req, res, next) => {
    try {
        const movies = await Promise.resolve(moviesMock);

        const movie = getMovieById(movies, req.params.id);

        res.status(200).json({
            data: movie,
            message: movie ? 'Movie retrieved' : 'Movie not found',
        });
    } catch (err) {
        next(err);
    }
});

moviesApi.post('/', async (req, res, next) => {
    try {
        const id = await Promise.resolve(moviesMock.categories[1].videos[0].id);

        res.status(201).json({
            data: id,
            message: 'Movie created',
        });
    } catch (err) {
        next(err);
    }
});

moviesApi.put('/:id', async (req, res, next) => {
    try {
        const id = await Promise.resolve(moviesMock.categories[1].videos[0].id);

        res.status(201).json({
            data: id,
            message: 'Movie updated',
        });
    } catch (err) {
        next(err);
    }
});

moviesApi.delete('/:id', async (req, res, next) => {
    try {
        const id = await Promise.resolve(moviesMock.categories[1].videos[0].id);

        res.status(201).json({
            data: id,
            message: 'Movie deleted',
        });
    } catch (err) {
        next(err);
    }
});

module.exports = { moviesApi };
