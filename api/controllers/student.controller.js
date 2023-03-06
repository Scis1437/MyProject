const {prisma} = require('../db')
const logger = require('../controllers/logger.controller')
const getAllStudent = async (req, res) => {
    const students = await prisma.student.findMany({})
    logger.teacherLog.log('info',req.user +' action = show ')
    res.json(students)
}


const getStudent = async (req, res) => {

    const data = req.body
    const studentCheck = await prisma.student.findMany({
        where: {
            
            id: req.body.id,
            
    
        },
        select:{
            id:true,
            name:true,
            tests:true
        }
 
        
    })

    res.json(studentCheck)
}


const addStudent = async(req, res) => {
    const data = req.body
    const addStudent = await prisma.student.create({
        select: {
            id: true,
            name: true,
        }, 
        data,
    })
    logger.teacherLog.log('info',[req.user,data.id,data.name+' action = add score'])
    res.json(addStudent)
}

const deleteStudent = async(req, res) => {
    const data = req.body
    const deleteStudent = await prisma.student.deleteMany({
        where: {
            // OR :[{id:data.id},{name:data.name}]
            id:data.id
            
        }, 
        
    })
    logger.teacherLog.log('info',[req.user,data.id,data.name+' action = deletestdname'])
    res.json(deleteStudent)
}

const updateStudent = async(req, res) => {
    const data = req.body
    const updateStudent = await prisma.student.updateMany({
        where: {
            OR :[{id:data.id},{name:data.name}]
            
            
        }, 
        data,
    })
    logger.teacherLog.log('info',[req.user,data.id,data.name+' action = update stdname'])
    res.json(updateStudent)
}

module.exports = {
    getAllStudent,
    getStudent,
    
    addStudent,
    updateStudent,
    deleteStudent,
}