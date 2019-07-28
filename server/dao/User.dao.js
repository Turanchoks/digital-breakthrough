var ObjectID = require('mongodb').ObjectID;

const loadDB = require('./../utils/db');

class UserDao {
  async saveUserIfNotExist(user) {
    const db = await loadDB();
    const users = db.collection('hackusers');
    let result;
    try {
      result = await users.insert({ ...user, points: 0 });
    } catch (error) {
      console.error(error);
    }
    console.info('UserDao#saveUserIfNotExist', result);
    return result;
  }

  async getUser(id) {
      const db = await loadDB();
      const users = db.collection('hackusers');
    let result;
    try {
      result = await users.findOne({ _id: ObjectID(id) });
    } catch (error) {
      console.error('UserDao#getUser', error);
    }
    console.info('UserDao#getUser', result);
    return result;
  }

  async getAllUsers() {
      const db = await loadDB();
      const users = db.collection('hackusers');
    let result;
    try {
      result = await users
        .find()
        .sort({ points: -1 })
        .toArray();
    } catch (error) {
      console.error('UserDao#getAllUsers', error);
    }
    console.info('UserDao#getAllUsers', result);
    return result;
  }

  async updateUser(id) {
    const db = await loadDB();

    const users = db.collection('hackusers');
    let result;
    try {
      result = await users.updateOne(
        { _id: ObjectID(id) },
        { $inc: { points: 1 } }
      );
    } catch (error) {
      console.error('UserDao#updateUser', error);
    }
    console.info('UserDao#updateUser', result);
    return result;
  }
}

module.exports = new UserDao();
