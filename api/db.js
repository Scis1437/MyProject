const { MongoClient } = require('mongodb')

const host = 'localhost'
const port = 27017
const user = 'user2'
const passwd = '1234'
const databaseUrl = `mongodb+srv://${user}:${passwd}@testproject.w32eqa7.mongodb.net/test`

const client = new MongoClient(databaseUrl)

let dbConnection

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("member");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};