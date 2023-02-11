const { json } = require('body-parser');
const {transports,format,createLogger} = require('winston');

const teacherLog = createLogger({
    transports:[
        new transports.File({
            filename:'teacher_log',
            level:'info',
            json:false,
            format: format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            filename:'teacher_log_error',
            level:'error',
            format: format.combine(format.timestamp(),format.json()),
            json:false,
        }),

    ]
})


module.exports = {teacherLog}