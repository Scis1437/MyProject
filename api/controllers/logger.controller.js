const { json } = require("body-parser");
const { transports, format, createLogger } = require("winston");
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

const app = express();

const teacherLog = createLogger({
  transports: [
    new transports.File({
      filename: "teacher_log",
      level: "info",
      json: false,
      format: format.combine(
        
        
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss.SSS",
          getTime: () => new Date(),
        }),
        format.json()
      ),
      
    }),
    new transports.File({
      filename: "teacher_log_error",
      level: "error",

      json: false,
      format: format.combine(
        
        
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss.SSS",
          getTime: () => new Date(),
        }),
        format.json()
      ),
    }),
    
  ],
});

const readLog = async(req, res) => { fs.readFile('teacher_log', 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    res.status(500).send('An error occurred while reading the log file.');
  } else {
    res.send(`<pre>${data}</pre>`);
  }
});}
module.exports = { teacherLog,readLog };
