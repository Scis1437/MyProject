const {prisma} = require('../db')
const getAllStudent = async (req, res) => {
    const students = await prisma.student.findMany({})
    res.json(students)
}

const addStudent = (req, res) => {
    res.json({err: 'need implemented'})
}

module.exports = {
    getAllStudent,
    addStudent,
}