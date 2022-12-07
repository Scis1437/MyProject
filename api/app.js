var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var testAPIRouter = require("./routes/testAPI");
const dbo = require('./db');
const { parseArgs } = require('util');
const db = require('./db');

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async function (req, res) {
  // db.users.count(function (err, result) {
  //   if (result <= 0) {
  //     db.users.insert(users.findAll(), function (err, docs) {
  //       // insert new data.
  //     })
  //   }
  //   res.send('<h1>Hello Node.js</h1>')
  // })
  const db = dbo.getDb()

  const student = db
    .collection('station')
    
    
    
    .find({}).limit(200)
    .toArray((err, result) => {
      if (err) res.status(400).send('Error fetching customers list')
      else res.json(result)
    })
    //const Station1 = 
  })
  
  
  // var mysql = require("mysql")
  // var { MongoClient } = require('mongodb');

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use("/testAPI", testAPIRouter);
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//mongo
app.get('/user', function (req, res) {
  const db = dbo.getDb()
  const users = db.collection('member')
  users.find(function (err, docs) {
    res.json(docs)
  })
})
app.get('/user/:id', function (req, res) {
  var id = Number(req.params.id)
  const db = dbo.getDb()
  const users = db.collection('member')
  users.findOne({ id:id }, function (err, docs) {
    res.json(docs)

  })
})

// app.get('/user/:stationId', (req, res) => {
//   res.json(user.find(user => user.stationID === req.params.stationId))
// })
app.get('/user/:id', function (req, res){
  var Station1 = Number(req.params.stationID)
  const db = dbo.getDb()
  const user = db.collection('member')
  user.findOne({stationID:stationID}, function(err,docs){
    res.json(docs)
  })
})
app.put('/station/:id', async(req, res) => {
  const filter = { stationID: `${req.params.id}`, ID: `${req.query.std}` };
  const updateDoc = {
    $set: {
      Test1: 5,
    },
  };
  // const option = {promoteValues: true}
  const updateIndex = await dbo.getDb().collection('station').findOneAndUpdate(filter, updateDoc, {returnDocument: 'after'})
  res.json({id: req.params.id, update: updateIndex.value})
})

// app.get('/Station1/:id', function (req, res) {
//   var id = parseArgs(req.params.id)

//   db.users.findOne({ id:id }, function (err, docs) {
//     res.json(docs)
//   })
// })
//post
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
