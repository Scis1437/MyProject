const XLSX = require('xlsx');
const {prisma} = require('../db')


const addAllStudent = async(req, res) => {
    const {data} = req.body
    console.log(data)
    const addAllStudent = await prisma.student.createMany({

       data:req.body,skipDuplicates: true,
       
    })
    const createLog = await prisma.logEntry.create({
        data: {
          message: `${req.user} add all  student with  `,
          level: "info",
          timestamp: new Date(),
        }, // optional, skips adding duplicates
      })
    
    res.json(addAllStudent)
}

module.exports = {addAllStudent,}