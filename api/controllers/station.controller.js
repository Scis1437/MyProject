const {prisma} = require('../db')
const getAllStation = async (req, res) => {
    const station = await prisma.station.findMany({})
    res.json(station)
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
    addStation,
}