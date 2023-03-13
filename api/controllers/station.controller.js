const {prisma} = require('../db')
const logger = require('../controllers/logger.controller')
const getAllStation = async (req, res) => {

    const station = await prisma.station.findMany({})
    logger.teacherLog.log('info',req.user +' action = show ')
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

const addStation = async(req, res) => {
    const data = req.body

    const createStation = await prisma.station.create({
        select: {
            // id: true,
            // station_name:true,
            // station_teacher:true,
            
        },  
        data,
    })
    logger.teacherLog.log('info',[req.user,data.id,data.student_name+' action = add score'])
    res.json(createStation)
}

const updateStation = async(req, res) => {

    const data = req.body
    const updateStation = await prisma.station.updateMany({
        where: {
            OR :[{id:data.id},{station_name:data.station_name}]
            
            
        }, 
        data,
    })
    logger.teacherLog.log('info',[req.user,data.id,data.station_name+' action = update station'])
    res.json(updateStation)
}

const deleteStation = async(req, res) => {
    const data = req.body
    console.log("delete " + data.station_name);
    const deleteStation = await prisma.station.deleteMany({
        where: {
            id:data.id,
            
            
            
        }, 
        
    })
    logger.teacherLog.log('info',[req.user,data.id,data.station_name+' action = delete station'])
    res.json(deleteStation)
}

module.exports = {
    
    getStation,
    addStation,
    updateStation,
    deleteStation,
    getStationScore,getAllStation,
}