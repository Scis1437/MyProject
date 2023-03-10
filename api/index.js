const express =  require("express");
const cors = require('cors')
const corsOptions = require("./config/corsOption");
const bodyParser = require('body-parser');
const logRouter = require('./routes/log.route');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const fs = require('fs');

const studentRouter = require('./routes/student.route');
const nonLoginRouter = require('./routes/nonLogin.route');
const stationRouter = require('./routes/station.route');
const testRouter = require('./routes/test.route');
const subtestRouter = require('./routes/subTest.route');
const teacherRouter = require('./routes/teacher.route');
const authRouter = require('./routes/auth.route');
const exportRouter = require('./routes/export.route');
const exportStationRouter = require('./routes/export_stationscore.route');
const refreshRouter = require('./routes/refresh.route');
const logoutRouter = require('./routes/logout.route');
const registerRouter = require('./routes/register.route');

const useJWT = require('./middleware/verifyJWT');


const app = express()
// app.get('/teacher-log', (req, res) => {
//     fs.readFile('teacher_log', 'utf-8', (err, data) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('An error occurred while reading the log file.');
//       } else {
//         res.send(`<pre>${data}</pre>`);
//       }
//     });
//   });

app.use(morgan('combined'));
// use middleware
//app.use(useJWT)
app.use(cors(corsOptions))
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json())
app.use(cookieParser());


app.use('/check-station',nonLoginRouter);
app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);

// app.use(useJWT)
const useJWTRouter = express.Router();
useJWTRouter.use(useJWT)
// router
useJWTRouter.use('/register', registerRouter)
useJWTRouter.use('/teacher-log', logRouter);
useJWTRouter.use('/export',exportRouter)
useJWTRouter.use('/teacher', teacherRouter)
useJWTRouter.use('/student', studentRouter)
useJWTRouter.use('/station',stationRouter)
useJWTRouter.use('/test',testRouter)
useJWTRouter.use('/subtest',subtestRouter)
useJWTRouter.use('/export-station',exportStationRouter)

app.use(useJWTRouter);

//app.use('/auth', authRouter)
// start server
app.listen(9000, () => {
    console.log('Server started')
})

module.exports = app;