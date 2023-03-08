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
    logger.teacherLog.log('info',req.user+'show success')
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
    logger.teacherLog.log('info',[req.name,data.station_Id,data.student_id+' action = add score'])
    res.json(addSubTest)

    //logger.teacherLog.log('info','add score success')
}
const deleteSubTest = async(req, res)=>{
    const data = req.body
    const deleteSubTest = await prisma.subtest.deleteMany({
        where:{
            station_Id: data.station_Id,
            //test_number:data.test_number,
        },
        


        // }
    })
    logger.teacherLog.log('info',[req.user,data.station_Id,data.student_id,data.test_number,data.score+' action = delete deleteSubTest'])
    res.json(deleteSubTest)}
module.exports = {
    addSubTest,
    getAllSubTest,
    deleteSubTest,
}