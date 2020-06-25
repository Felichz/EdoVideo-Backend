function cachedResponse(seconds) {
    return function (req, res, next) {
        res.set('Cache-Control', `public, max-age=${seconds}`);
        next();
    };
}

module.exports = cachedResponse;
