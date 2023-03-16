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

const updateSubtest = async(req, res)=>{
    const data = req.body


    const updateSubtest = await prisma.user.updateMany({
        
        where:{
            OR :[{id:req.body.station_id},{name: req.body.test_number}]
            
            
        },
        
        data,


    }).catch(console.error)
    const createLog = await prisma.logEntry.create({
        data: {
          message: `${req.user} update a  teacher with id ${data.id} and name ${data.name}`,
          level: "info",
          timestamp: new Date(),
        }
      })
    res.json(updateTeacher)


}
const deleteSubTest = async(req, res)=>{
    const data = req.body
    const deleteSubTest = await prisma.subtest.delete({
        where:{
            
            test_name:req.query.test_name,
        },
        


        // }
    })
    const createLog = await prisma.logEntry.create({
        data: {
          message: `${req.user} delete a  subtest with  subtest_name `,
          level: "info",
          timestamp: new Date(),
        }
      })
    res.json(deleteSubTest)}
module.exports = {
    addSubTest,
    getAllSubTest,
    deleteSubTest,
    updateSubtest,
}