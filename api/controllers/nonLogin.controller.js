const {prisma} = require('../db')
const logger = require('../controllers/logger.controller')
const getNonLoginStudent = async (req, res) => {

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

module.exports = {

    getNonLoginStudent,
    

}