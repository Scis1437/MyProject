const { MongoClient } = require('mongodb')

const host = 'localhost'
const port = 27017
const user = 'user2'
const passwd = '1234'
const databaseUrl = `mongodb+srv://${user}:${passwd}@testproject.w32eqa7.mongodb.net/test`

const client = new MongoClient(databaseUrl)

let dbConnection
// let join = MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("member");
//   dbo.collection('student').aggregate([
//     { $lookup:
//        {
//          from: 'Station1',
//          localField: 'Stationid',
//          foreignField: 'ID',
//          as: 'Station1 Score'
//        }
//      }
//     ]).toArray(function(err, res) {
//     if (err) throw err;
//     console.log(JSON.stringify(res));
//     db.close();
// });
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }

      dbConnection = db.db("member");
      //dbConnection = db.db("Station1");
      console.log("Successfully connected to MongoDB.");

      return callback();
    });
  },

  getDb: function () {
    return dbConnection;
  },
};