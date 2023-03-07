const express =  require("express");
const cors = require('cors')
const bodyParser = require('body-parser');
const logRouter = require('./routes/log.route');
const studentRouter = require('./routes/student.route');
const nonLoginRouter = require('./routes/nonLogin.route');
const stationRouter = require('./routes/station.route');
const testRouter = require('./routes/test.route');
const teacherRouter = require('./routes/teacher.route');
const authRouter = require('./routes/auth.route');
const exportRouter = require('./routes/export.route');
const exportStationRouter = require('./routes/export_stationscore.route');
const refreshRouter = require('./routes/refresh.route');
const logoutRouter = require('./routes/logout.route');
const useJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const registerRouter = require('./routes/register.route');
const app = express()
const morgan = require('morgan');
const fs = require('fs');


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
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json())
app.use('/check-station',nonLoginRouter);
app.use(cookieParser());
app.use('/register', registerRouter)
app.use('/auth', authRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);

app.use(useJWT)
// router
app.use('/teacher-log', logRouter);
app.use('/export',exportRouter)
app.use('/teacher', teacherRouter)
app.use('/student', studentRouter)
app.use('/station',stationRouter)
app.use('/test',testRouter)
app.use('/export-station',exportStationRouter)


//app.use('/auth', authRouter)
// start server
app.listen(9000, () => {
    console.log('Server started')
})