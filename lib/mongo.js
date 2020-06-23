const debug = require('debug')('app:db');
const config = require('../config');
const { MongoClient, ObjectId } = require('mongodb');

const DB_HOST = config.dbHost;
const DB_NAME = config.dbName;
const DB_PORT = config.dbPort || null;
const DB_USER = encodeURIComponent(config.dbUser);
const DB_PASSWORD = encodeURIComponent(config.dbPassword);

if (!config.dbUser && !config.dbPassword && config.dev) {
    var MONGO_URI = `mongodb://${DB_HOST}:${DB_PORT}/?retryWrites=true&w=majority`;
} else {
    var MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true&w=majority`;
}

debug(MONGO_URI);

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, {
            useNewUrlParser: true,
        });
        this.dbName = DB_NAME;
    }

    connect() {
        if (!MongoLib.connection) {
            MongoLib.connection = new Promise((resolve, reject) => {
                this.client.connect((err) => {
                    if (err) {
                        reject(err);
                    }

                    debug('Successfully connected to mongodb');

                    resolve(this.client.db(this.dbName));
                });
            });
        }

        return MongoLib.connection;
    }

    getAll(collection) {
        return this.connect().then((db) => {
            return db.collection(collection).find({}).toArray();
        });
    }

    get(collection, id) {
        return this.connect().then((db) => {
            return db.collection(collection).findOne({ _id: ObjectId(id) });
        });
    }

    getWithProjection(collection, id, projectionObj) {
        return this.connect().then((db) => {
            return db
                .collection(collection)
                .findOne({ _id: ObjectId(id) }, { projection: projectionObj });
        });
    }

    create(collection, data) {
        return this.connect().then((db) => {
            return db.collection(collection).insertOne(data);
        });
    }

    update(collection, id, data) {
        return this.connect().then((db) => {
            return db
                .collection(collection)
                .updateOne({ _id: ObjectId(id) }, { $set: data });
        });
    }

    delete(collection, id) {
        return this.connect().then((db) => {
            return db
                .collection(collection)
                .deleteOne({ _id: ObjectId(id) })
                .then((output) => output);
        });
    }

    pushToArray(collection, id, arrayName, data) {
        return this.connect().then((db) => {
            return db
                .collection(collection)
                .updateOne(
                    { _id: ObjectId(id) },
                    { $addToSet: { [arrayName]: data } }
                );
        });
    }

    pullFromArray(collection, id, arrayName, pullId) {
        return this.connect().then((db) => {
            return db
                .collection(collection)
                .updateOne(
                    { _id: ObjectId(id) },
                    { $pull: { [arrayName]: { _id: ObjectId(pullId) } } }
                );
        });
    }
}

module.exports = new MongoLib();
