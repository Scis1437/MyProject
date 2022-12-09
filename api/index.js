const express =  require("express");
const cors = require('cors')
const bodyParser = require('body-parser');

const studentRouter = require('./routes/student.route');
const stationRouter = require('./routes/station.route');
const testRouter = require('./routes/test.route');

const app = express()

// use middleware
app.use(cors())
app.use(bodyParser.json())

// router
app.use('/student', studentRouter)
app.use('/station',stationRouter)
app.use('/test',testRouter)
// start server
app.listen(9000, () => {
    console.log('Server started')
})