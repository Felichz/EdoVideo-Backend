const mongo = require('../lib/mongo');

class StandardService {
    constructor(collectionName) {
        this.mongo = mongo;
        this.collection = collectionName;
    }

    async getAll() {
        return await this.mongo.getAll(this.collection);
    }

    async get(id) {
        return await this.mongo.get(this.collection, id);
    }

    async create(item) {
        return await this.mongo.create(this.collection, item);
    }

    async update(id, item) {
        return await this.mongo.update(this.collection, id, item);
    }

    async delete(id) {
        return await this.mongo.delete(this.collection, id);
    }
}

module.exports = StandardService;
