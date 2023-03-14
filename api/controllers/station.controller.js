const {prisma} = require('../db')
const logger = require('../controllers/logger.controller')
const { createLogger, format, transports } = require("winston");
const fs = require('fs');
const { info } = require('console');

// const logger = createLogger({
//     transports: [
//       new transports.Console({
//         level: 'info',
//         format: format.combine(
//           format.timestamp(),
//           format.colorize(),
//           format.simple()
//         )
//       }),
//       new transports.File({
//         filename: 'logs.log',
//         level: 'info',
//         format: format.combine(
//           format.timestamp({
//             format: 'YYYY-MM-DD HH:mm:ss'
//           }),
//           format.json()
//         ),
//         async write(info) {
//           await prisma.logEntry.create({
//             data: {
//               message: info.message,
//               level: info.level,
//               timestamp: new Date(info.timestamp),
//             }
//           })
//         }
//       })
//     ]
//   })
  
const getAllStation = async (req, res) => {

    const station = await prisma.station.findMany({})
    
    res.json(station)
}

const getStation = async (req, res) => {
    const station1 = await prisma.station.findMany({
        where: {
            
            id:req.query.id,
            
            
        },
        select:{
            id:true,
            station_name:true,
            station_teacher:true,
            
        }
 
        
    })
    res.json(station1)
}

const getStationScore= async (req, res) => {
    const station_testScore = await prisma.station.findMany({
        where: {
            
            id:  req.query.id,
            
            
        },
        select:{
            id:true,
            station_name:true,
            station_teacher:true,
            tests:true,
        }
 
        
    })
    res.json(station_testScore)
}

const addStation = async (req, res) => {
    const data = req.body;
  
    try {
      const createStation = await prisma.station.create({
        data,
      });
      const createLog = await prisma.logEntry.create({
        data: {
          message: `${req.user} added a new station with id ${createStation.id} and name ${createStation.station_name}`,
          level: "info",
          timestamp: new Date(),
        }
      })
      // Log to teacher_log file and database
      


      res.json(createStation);
    } catch (error) {
      // Log to teacher_log_error file and database
      res.status(500).json({ error: "Failed to create station" });
    }
  };

const updateStation = async(req, res) => {

    const data = req.body
    const updateStation = await prisma.station.updateMany({
        where: {
            OR :[{id:data.id},{station_name:data.station_name}]
            
            
        }, 
        data,
    })
    const createLog = await prisma.logEntry.create({
        data: {
          message: `${req.user} updated a  station with id ${data.id} and name ${data.station_name}`,
          level: "info",
          timestamp: new Date(),
        }
      })
    res.json(updateStation)
}

const deleteStation = async(req, res) => {
    const data = req.body

    const deleteStation = await prisma.station.deleteMany({
        where: {
            id:data.id,
        }, 
        
    }); 
    if (deleteStation) {
        const createLog = await prisma.logEntry.create({
            data: {
              message: `${req.user} delete a  station with id ${data.id} and name ${data.station_name}`,
              level: "info",
              timestamp: new Date(),
            }
          })
        res.status(200).json({ message: 'Station deleted successfully' });
    } 
    // logger.teacherLog.log('info',[req.user,data.id,data.station_name+' action = delete station'])
    // res.json(console.error)
}

module.exports = {
    
    getStation,
    addStation,
    updateStation,
    deleteStation,
    getStationScore,getAllStation,
}