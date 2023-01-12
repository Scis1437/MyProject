const {prisma} = require('../db')
const getAllStudent = async (req, res) => {
    const students = await prisma.student.findMany({})
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
    res.json(addStudent)
}

module.exports = {
    getAllStudent,
    
    addStudent,
}