const {prisma} = require('../db')
const getAllStudent = async (req, res) => {
    const students = await prisma.student.findMany({})
    res.json(students)
}

const addStudent = async(req, res) => {
    const addStudent = await prisma.student.create({
        select: {
            id: true,
            name: true,
        }, 
        data: {
            name: 'Prayat Kaewthep',
            
            
        }
    })
    res.json(addStudent)
}

module.exports = {
    getAllStudent,
    addStudent,
}