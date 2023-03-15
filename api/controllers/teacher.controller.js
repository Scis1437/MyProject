const {prisma} = require('../db')
const logger = require('../controllers/logger.controller')
const getAllTeacher = async (req, res) => {
    const teacher = await prisma.user.findMany({})
    
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
    const createLog = await prisma.logEntry.create({
        data: {
          message: `${req.user} add a  teacher with name ${data.teacher_name}`,
          level: "info",
          timestamp: new Date(),
        }
      })
    res.json(addTeacher)
}

const updateTeacher = async(req, res)=>{
    const data = req.body


    const updateTeacher = await prisma.station.updateMany({
        
        where:{
            OR :[{id:req.body.id},{name: req.body.station_teacher}]
            
            
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




const deleteTeacher = async(req, res)=>{
    const data = req.body
    const deleteTeacher = await prisma.user.deleteMany({
        where:{
            OR :[{name: data.query.teacher_name}]
            ,
        },data,


        // }
    })
    const createLog = await prisma.logEntry.create({
        data: {
          message: `${req.user} delete a  teacher with  name ${data.teacher_name}`,
          level: "info",
          timestamp: new Date(),
        }
      })
    res.json(deleteTeacher)}
   

    
module.exports = {
    addTeacher,
    getAllTeacher,
    deleteTeacher,
    updateTeacher,
}