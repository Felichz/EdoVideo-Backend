const categoriesService = require('../services/categoriesService');
const StandardApiGen = require('./StandardApiGen');
const analizeOutput = require('./utils/analizeOutput');

const schemaValidator = require('../utils/middlewares/schemaValidator');

const {
    createCategorySchema,
    updateCategorySchema,
} = require('../utils/schemas/categorySchema');

const {
    hexIdObjectSchema,
    hexIdSchema,
} = require('../utils/schemas/hexIdSchema');

class CategoriesApiGen extends StandardApiGen {
    _genRoutes() {
        StandardApiGen.prototype._genRoutes.call(this);

        this.apiRouter.post(
            '/:id/movies',
            schemaValidator(hexIdObjectSchema, 'params'),
            schemaValidator(hexIdObjectSchema, 'body'),
            async (req, res, next) => {
                try {
                    const pushOutput = await this.service.pushMovie(
                        req.params.id,
                        req.body.id
                    );

                    let httpCode = 201;
                    let message = '';
                    let response = null;

                    if (pushOutput) {
                        switch (analizeOutput(pushOutput)) {
                            case 'Match without modifications':
                                message =
                                    'The movie is already in this category';
                                break;
                            case 'Match with modifications':
                                response = req.body.id;
                                message = 'Movie added to category';
                                break;
                            case 'No match':
                                httpCode = 404;
                                message = 'Category not found';
                                break;
                        }
                    } else {
                        httpCode = 400;
                        message = 'Movie not found';
                    }

                    res.status(httpCode).send({
                        data: response,
                        message,
                    });
                } catch (err) {
                    next(err);
                }
            }
        );

        this.apiRouter.delete(
            '/:id/movies',
            schemaValidator(hexIdObjectSchema, 'params'),
            schemaValidator(hexIdObjectSchema, 'body'),
            async (req, res, next) => {
                try {
                    const pullOutput = await this.service.pullMovie(
                        req.params.id,
                        req.body.id
                    );

                    let httpCode = 200;
                    let message = '';
                    let response;

                    switch (analizeOutput(pullOutput)) {
                        case 'Match without modifications':
                            httpCode = 400;
                            message = 'Movie not found in this category';
                            break;
                        case 'Match with modifications':
                            response = req.body.id;
                            message = 'Movie removed from category';
                            break;
                        case 'No match':
                            httpCode = 404;
                            message = 'Category not found';
                            break;
                    }

                    res.status(httpCode).send({ data: response, message });
                } catch (err) {
                    next(err);
                }
            }
        );
    }
}

const categoriesApiGen = new CategoriesApiGen({
    service: categoriesService,
    createItemSchema: createCategorySchema,
    updateItemSchema: updateCategorySchema,
});

module.exports = categoriesApiGen.genRouter();
