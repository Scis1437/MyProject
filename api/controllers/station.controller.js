const {prisma} = require('../db')
const getAllStation = async (req, res) => {
    const station = await prisma.station.findMany({})
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
    res.json(createStation)
}

module.exports = {
    getAllStation,
    getStation,
    addStation,
}