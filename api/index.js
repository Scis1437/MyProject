// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";
// var mongojs = require('./db')
// var db = mongojs.connect

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   let myObj ={id:"620610796",name:"Pryat Kaewthep"};
//   dbo.collection("customers").insertOne(myObj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });