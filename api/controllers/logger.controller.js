const { json } = require("body-parser");
// const { transports, format, createLogger } = require("winston");
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const {prisma} = require('../db')

const app = express();
const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.simple()
      )
    }),
    new transports.File({
      filename: 'logs.log',
      level: 'info',
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.json()
      ),
      async write(info) {
        await prisma.logEntry.create({
          data: {
            message: info.message,
            level: info.level,
            timestamp: new Date(info.timestamp),
          }
        })
      }
    })
  ]
});

const getLog = async (req, res) => {

  const getLog = await prisma.logEntry.findMany({})
  
  res.json(getLog)
}


module.exports= {getLog,logger};
