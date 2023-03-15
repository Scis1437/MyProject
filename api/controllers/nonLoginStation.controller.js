const {prisma} = require('../db')
const logger = require('./logger.controller')

const showStation =async (req,res)=>{
    const stationCheck = await prisma.station.findMany({
        select:{
            station_name:true,
        }
    })
    //console.log(req.query.student_id)
    res.json(stationCheck)
}
module.exports = {

showStation,
    

}