const {prisma} = require('../db')
const user = require("../model/users.json")
const logger = require('../controllers/logger.controller')
const getAllSubTest = async (req, res) => {
    const data=req.body
    const getAllSubTest = await prisma.subtest.findMany({
        select:{
            station_Id:true,
            test_name:true,
            test_number:true,

        },
        where:{
            station_Id:req.query.station_Id,
        }
    })
    
    res.json(getAllSubTest)
}
const addSubTest = async(req, res)=>{
    const data = req.body
    const addSubTest = await prisma.subtest.create({
        select:{
            station_Id:true,
            test_name:true,
            test_number:true,
            
        },
        data,
    })
    const createLog = await prisma.logEntry.create({
        data: {
          message: `${req.user} add a  subtest with station_id ${data.station_Id} , name ${data.test_name} and test_number ${data.test_number}`,
          level: "info",
          timestamp: new Date(),
        }
      })
    res.json(addSubTest)

    //logger.teacherLog.log('info','add score success')
}
const deleteSubTest = async(req, res)=>{
    const data = req.body
    const deleteSubTest = await prisma.subtest.deleteMany({
        where:{
            station_Id: data.query.station_Id,
            test_number:data.query.test_number,
        },
        


        // }
    })
    const createLog = await prisma.logEntry.create({
        data: {
          message: `${req.user} delete a  subtest with station_id ${data.station_Id}  and test_number ${data.test_number}`,
          level: "info",
          timestamp: new Date(),
        }
      })
    res.json(deleteSubTest)}
module.exports = {
    addSubTest,
    getAllSubTest,
    deleteSubTest,
}