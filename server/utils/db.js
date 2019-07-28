
const MongoClient = require('mongodb').MongoClient;
const keys = require('../config');

let db;

const loadDB = async () => {
    if (db) {
        return db;
    }
    try {
        const client = await MongoClient.connect(keys.mongoURI);
        // global.db = client.db('mongo');
        db = client.db('mongo');
        console.log('connection to db successful');
    } catch (err) {
        console.log('connection to db failed ', err);
    }
    return db;
};

module.exports = loadDB;
