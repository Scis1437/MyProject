const express =  require("express");
const cors = require('cors')
const bodyParser = require('body-parser');

const studentRouter = require('./routes/student.route');
const stationRouter = require('./routes/station.route');
const testRouter = require('./routes/test.route');
const authRouter = require('./routes/auth.route');
const useJWT = require('./middleware/verifyJWT');
const registerRouter = require('./routes/register.route');
const app = express()

// use middleware
//app.use(useJWT)
app.use(cors())
app.use(bodyParser.json())
//app.use(cookieParser());
app.use('/register', registerRouter)
app.use('/auth', require('./routes/auth.route'));


app.use(useJWT)
// router
app.use('/student', studentRouter)
app.use('/station',stationRouter)
app.use('/test',testRouter)

//app.use('/auth', authRouter)
// start server
app.listen(9000, () => {
    console.log('Server started')
})