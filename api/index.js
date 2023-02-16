const express =  require("express");
const cors = require('cors')
const bodyParser = require('body-parser');

const studentRouter = require('./routes/student.route');
const stationRouter = require('./routes/station.route');
const testRouter = require('./routes/test.route');
const authRouter = require('./routes/auth.route');
const exportRouter = require('./routes/export.route');
const refreshRouter = require('./routes/refresh.route');
const logoutRouter = require('./routes/logout.route');
const useJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const registerRouter = require('./routes/register.route');
const app = express()

// use middleware
//app.use(useJWT)
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json())

app.use(cookieParser());
app.use('/register', registerRouter)
app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);

app.use(useJWT)
// router
app.use('/student', studentRouter)
app.use('/station',stationRouter)
app.use('/test',testRouter)
app.use('/export',exportRouter)

//app.use('/auth', authRouter)
// start server
app.listen(9000, () => {
    console.log('Server started')
})