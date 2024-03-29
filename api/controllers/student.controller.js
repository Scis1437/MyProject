const {prisma} = require('../db')
const logger = require('../controllers/logger.controller')
const getAllStudent = async (req, res) => {
    const students = await prisma.student.findMany({})
    
    res.json(students)
}


const getStudent = async (req, res) => {

    const data = req.body

    const studentCheck = await prisma.student.findFirst({
        where: {
            id: req.params.student_id,
        },
        select:{
            name:true
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
    const createLog = await prisma.logEntry.create({
        data: {
          message: `${req.user} add a  student with id ${data.id} and name ${data.name}`,
          level: "info",
          timestamp: new Date(),
        }
      })
    res.json(addStudent)
}

const deleteStudent = async(req, res) => {
    const data = req.body
    const deleteStudent = await prisma.student.deleteMany({

        
    })
    const createLog = await prisma.logEntry.create({
        data: {
          message: `${req.user} reset all students`,
          level: "info",
          timestamp: new Date(),
        }
      })
    res.json(deleteStudent)
}

const updateStudent = async(req, res) => {
    const data = req.body
    const updateStudent = await prisma.student.updateMany({
        where: {
            OR :[{id:req.body.id},{name:req.body.name}]
            
            
        }, 
        data,
    })
    const createLog = await prisma.logEntry.create({
        data: {
          message: `${req.user} updated a  student with id ${data.id} and name ${data.name}`,
          level: "info",
          timestamp: new Date(),
        }
      })
    res.json(updateStudent)
}


module.exports = {
    getAllStudent,
    getStudent,
   
    addStudent,
    updateStudent,
    deleteStudent,
}