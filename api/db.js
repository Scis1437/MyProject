const { MongoClient } = require('mongodb')

const host = 'localhost'
const port = 27017
const databaseUrl = `mongodb://${host}:${port}/mydb`

const client = new MongoClient(databaseUrl)

let dbConnection

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("mydb");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};