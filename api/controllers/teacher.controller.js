const {prisma} = require('../db')
const logger = require('../controllers/logger.controller')
const getAllTeacher = async (req, res) => {
    const teacher = await prisma.teacher.findMany({})
    logger.teacherLog.log('info',req.user +' action = show ')
    res.json(teacher)
}

const addTeacher = async(req, res) => {
    const data = req.body
    const addTeacher = await prisma.teacher.create({
        select: {
            
            teacher_name: true,
        }, 
        data,
    })
    logger.teacherLog.log('info',[req.user,data.id,data.name+' action = add teacher'])
    res.json(addTeacher)
}

const deleteTeacher = async(req, res)=>{
    const data = req.body
    const deleteTeacher = await prisma.teacher.deleteMany({
        where:{
            teacher_name: data.teacher_name,
        },


        // }
    })
    logger.teacherLog.log('info',[req.user,data.station_Id,data.student_id,data.test_number,data.score+' action = delete teacher'])
    res.json(deleteTeacher)}
   

    
module.exports = {
    addTeacher,
    getAllTeacher,
    deleteTeacher,
}