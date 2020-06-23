const express = require('express');
const analizeOutput = require('./utils/analizeOutput');

const validationHandler = require('../utils/middlewares/schemaValidator');
const schemaValidator = require('../utils/middlewares/schemaValidator');
const { hexIdObjectSchema } = require('../utils/schemas/hexIdSchema');

class StandardApiGen {
    constructor({ service, createItemSchema, updateItemSchema }) {
        this.service = service;
        this.createItemSchema = createItemSchema;
        this.updateItemSchema = updateItemSchema;
        this.apiRouter = express.Router();
    }

    genRouter() {
        this._genRoutes();
        return this.apiRouter;
    }

    _genRoutes() {
        this._genGetAll();
        this._genGet();
        this._genCreate();
        this._genUpdate();
        this._genDelete();
    }

    _genGetAll() {
        this.apiRouter.get('/', async (req, res, next) => {
            try {
                const item = await this.service.getAll();

                res.status(200).json({
                    data: item,
                    message: 'Items listed',
                });
            } catch (err) {
                next(err);
            }
        });
    }

    _genGet() {
        this.apiRouter.get(
            '/:id',
            schemaValidator(hexIdObjectSchema, 'params'),
            async (req, res, next) => {
                try {
                    const item = await this.service.get(req.params.id);

                    let httpCode = 200;
                    let message = '';
                    let response = null;

                    if (item) {
                        message = 'Item retrieved';
                        response = item;
                    } else {
                        message = 'Item not found';
                        httpCode = 404;
                    }

                    res.status(httpCode).json({
                        data: response,
                        message,
                    });
                } catch (err) {
                    next(err);
                }
            }
        );
    }

    _genCreate() {
        this.apiRouter.post(
            '/',
            schemaValidator(this.createItemSchema, 'body'),
            async (req, res, next) => {
                try {
                    const output = await this.service.create(req.body);
                    const { insertedId } = output;

                    let httpCode = 201;

                    res.status(httpCode).json({
                        data: insertedId,
                        message: 'Item created',
                    });
                } catch (err) {
                    next(err);
                }
            }
        );
    }

    _genUpdate() {
        this.apiRouter.put(
            '/:id',
            schemaValidator(hexIdObjectSchema, 'params'),
            schemaValidator(this.updateItemSchema, 'body'),
            async (req, res, next) => {
                try {
                    let httpCode = 200;
                    let message = '';
                    let response = null;

                    const output = await this.service.update(
                        req.params.id,
                        req.body
                    );

                    switch (analizeOutput(output)) {
                        case 'Match without modifications':
                            httpCode = 200;
                            response = req.params.id;
                            message = 'The item is identical';
                            break;
                        case 'Match with modifications':
                            httpCode = 200;
                            response = req.params.id;
                            message = 'Item updated';
                            break;
                        case 'No match':
                            httpCode = 404;
                            message = 'Item not found';
                            break;
                    }

                    res.status(httpCode).json({
                        data: response,
                        message,
                    });
                } catch (err) {
                    next(err);
                }
            }
        );
    }

    _genDelete() {
        this.apiRouter.delete(
            '/:id',
            schemaValidator(hexIdObjectSchema, 'params'),
            async (req, res, next) => {
                try {
                    const output = await this.service.delete(req.params.id);

                    let httpCode = 200;
                    let message = '';
                    let response = null;

                    if (output.deletedCount > 0) {
                        message = 'Item deleted';
                        response = req.params.id;
                    } else {
                        message = 'Item not found';
                        httpCode = 404;
                    }

                    res.status(httpCode).json({
                        data: response,
                        message,
                    });
                } catch (err) {
                    next(err);
                }
            }
        );
    }
}

module.exports = StandardApiGen;
