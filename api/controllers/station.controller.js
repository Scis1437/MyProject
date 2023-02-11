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
            
            station_name:  req.params.station_name,
            
            
        },
        select:{
            id:true,
            tests:true
        }
 
        
    })
    res.json(station1)
}


const addStation = async(req, res) => {
    const data = req.body
    console.log(data)
    const createStation = await prisma.station.create({
        select: {
            id: true,
            station_name: true,
            
        },  
        data,
    })
    logger.teacherLog.log('info',[req.user,data.id,data.student_name+' action = add score'])
    res.json(createStation)
}

module.exports = {
    getAllStation,
    getStation,
    addStation,
}