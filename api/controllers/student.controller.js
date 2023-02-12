const {prisma} = require('../db')
const logger = require('../controllers/logger.controller')
const getAllStudent = async (req, res) => {
    const students = await prisma.student.findMany({})
    logger.teacherLog.log('info',req.user +' action = show ')
    res.json(students)
}


// const getStudent = async (req, res) => {
//     const studentCheck = await prisma.student.findMany({
//         where: {
            
//             name:  req.params.name,
            
            
//         },
//         select:{
//             id:true,
//             name:true,
//             tests:true
//         }
 
        
//     })
//     res.json(studentCheck)
// }


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

module.exports = {
    getAllStudent,
    
    addStudent,
}