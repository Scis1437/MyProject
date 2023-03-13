const {prisma} = require('../db')
const logger = require('../controllers/logger.controller')
const getAllTeacher = async (req, res) => {
    const teacher = await prisma.user.findMany({})
    logger.teacherLog.log('info',req.user +' action = show ')
    res.json(teacher)
}

const addTeacher = async(req, res) => {
    const data = req.body
    const addTeacher = await prisma.user.create({
        select: {
            
            teacher_name: true,
        }, 
        data,
    })
    logger.teacherLog.log('info',[req.user,data.id,data.name+' action = add teacher'])
    res.json(addTeacher)
}

const updateTeacher = async(req, res)=>{
    const data = req.body


    const updateTeacher = await prisma.user.updateMany({
        
        where:{
            OR :[{id:data.id},{name: data.name}]
            
            
        },
        
        data,


    }).catch(console.error)
    logger.teacherLog.log('info',[req.user,data.student_teacher,data.station_Id,data.student_id+' action = update teacher'])
    res.json(updateTeacher)


}




const deleteTeacher = async(req, res)=>{
    const data = req.body
    const deleteTeacher = await prisma.user.deleteMany({
        where:{
            OR :[{station_Id:data.station_Id},{name: data.teacher_name}]
            ,
        },data,


        // }
    })
    logger.teacherLog.log('info',[req.user,data.station_Id,data.student_id,data.test_number,data.score+' action = delete teacher'])
    res.json(deleteTeacher)}
   

    
module.exports = {
    addTeacher,
    getAllTeacher,
    deleteTeacher,
    updateTeacher,
}