const {prisma} = require('../db')
const logger = require('../controllers/logger.controller')
const getNonLoginStudent = async (req, res) => {

    const data = req.body
    const studentCheck = await prisma.test.findMany({
        where: {
            student_id: req.query.student_id,
        },
        select:{
            student_id:true,
            name:true,
            station_name:true,
            score:true
        }
    
        
    })
    res.json(studentCheck)
}



module.exports = {

    getNonLoginStudent,
    

}