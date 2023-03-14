const { json } = require("body-parser");
// const { transports, format, createLogger } = require("winston");
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const {prisma} = require('../db')

const app = express();
const { createLogger, format, transports } = require("winston");


const teacherLog = createLogger({
  transports: [
    new transports.File({
      filename: "teacher_log",
      level: "info",
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss.SSS",
        }),
        format.json(),
      ),
      // Log to database
      async write(info) {
        await prisma.logEntry.create({
          data: {
            message: info.message,
            level: info.level,
            timestamp: new Date(info.timestamp),
          },
        });
      },
    }),
    new transports.File({
      filename: "teacher_log_error",
      level: "error",
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss.SSS",
        }),
        format.json(),
      ),
      // Log to database
      async write(info) {
        await prisma.logEntry.create({
          data: {
            message: info.message,
            level: info.level,
            timestamp: new Date(info.timestamp),
          },
        });
      },
    }),
  ],
});





// const teacherLog = createLogger({
//   transports: [
//     new transports.File({
//       filename: "teacher_log",
//       level: "info",
//       format: format.combine(
//         format.timestamp({
//           format: "YYYY-MM-DD HH:mm:ss.SSS",
//         }),
//         format.json(),
//       ),
//       // Log to database
//       async write(info) {
//         await prisma.logEntry.create({
//           data: {
//             message: info.message,
//             level: info.level,
//             timestamp: new Date(info.timestamp),
//           },
//         });
//       },
//     }),
//     new transports.File({
//       filename: "teacher_log_error",
//       level: "error",
//       format: format.combine(
//         format.timestamp({
//           format: "YYYY-MM-DD HH:mm:ss.SSS",
//         }),
//         format.json(),
//       ),
//       // Log to database
//       async write(info) {
//         await prisma.logEntry.create({
//           data: {
//             message: info.message,
//             level: info.level,
//             timestamp: new Date(info.timestamp),
//           },
//         });
//       },
//     }),
//   ],
// });
// const teacherLog = createLogger({

//   transports: [
//     new transports.File({
//       filename: "teacher_log",
//       level: "info",
//       json: false,
//       format: format.combine(
        
        
//         format.timestamp({
//           format: "YYYY-MM-DD HH:mm:ss.SSS",
//           getTime: () => new Date(),
//         }),
//         format.json()
//       ),
      
//     }),
//     new transports.File({
//       filename: "teacher_log_error",
//       level: "error",

//       json: false,
//       format: format.combine(
        
        
//         format.timestamp({
//           format: "YYYY-MM-DD HH:mm:ss.SSS",
//           getTime: () => new Date(),
//         }),
//         format.json()
//       ),
//     }),
    
//   ],
// });
// const addLog = async (req, res) => {
//   const data = fs.readFileSync("teacher_log", "utf-8");
//   const result = await prisma.log.create({
//     data: {
//       logname: data, // assuming the log model has a "content" field to store the log data
//     },
//   });
//   console.log(result);
//   res.status(200).json({ message: "Log added successfully" });
// };


const readLog = async(req, res) => { fs.readFile('teacher_log', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    res.status(500).send('An error occurred while reading the log file.');
  } else {
    res.send(`<pre>${data}</pre>`);
  }
});}

module.exports={createLog,teacherLog,readLog,}
