const {prisma} = require('../db')
const user = require("../model/users.json")
const logger = require('../controllers/logger.controller')
const getAllTest = async (req, res) => {
    const tests = await prisma.test.findMany({})
    
    res.json(tests)
}

const getStudenttest = async (req, res) => {
    const studentCheck = await prisma.test.findMany({
        where: {
            
            student_id:  req.query.student_id,
            
            
        },
        select:{
            student_id:true,
            station_Id:true,
            test_number:true,
            score:true
        },
 
    })
    res.json(req.params.student_id)
    
    //res.json(studentCheck);
    //logger.teacherLog.log('info','show success')  
}
const addScore = async(req, res)=>{
    const data = req.body
    const addScore = await prisma.test.create({
        select:{
            station_Id:true,
            student_id:true,


        },
        data,
        // data: {
        //     test_number:2,
        //     score: 10,
        //     station_Id: "clbgnzizb0000v4ag550yepfe",
        //     student_id: "clbhmthk20000v4s4f4yu874a",
        // }
    })
    const createLog = await prisma.logEntry.create({
        data: {
          message: `${req.user} add a  test score with id ${data.student_id} at station ${data.station_Id}`,
          level: "info",
          timestamp: new Date(),
        }
      })
    res.json(addScore)

    //logger.teacherLog.log('info','add score success')
}

const updateTest = async(req, res)=>{
    const data = req.body


    const updateScore = await prisma.test.updateMany({
        
        where:{
            station_Id:data.query.station_Id,
            student_id:data.query.student_id,
            test_number:data.query.test_number,
            // score:data.score,
        },
        
        data: {score: data.query.score},


    }).catch(console.error)
    const createLog = await prisma.logEntry.create({
        data: {
          message: `${req.user} updated a  test score with id ${data.student_id} at station ${data.station_Id} test_number ${data.test_number} with score ${data.score}`,
          level: "info",
          timestamp: new Date(),
        }
      })
    res.json(addScore)
    res.json(updateScore)


}

const deleteTest = async(req, res)=>{
    const data = req.body
    const deleteScore = await prisma.test.deleteMany({
        where:{

             station_Id:req.query.station_Id,
             student_id:req.query.student_id,
             test_number:Number(req.query.test_number),
            // test_name:data.test_name,
            // score:data.score,
        }


        // }
    })

    const createLog = await prisma.logEntry.create({
        data: {
          message: `${req.user} delete a  test score with id ${data.student_id} at station ${data.station_Id} test_number:${data.test_number},
          test_name:${data.test_name},
          score:${data.score}`,
          level: "info",
          timestamp: new Date(),
        }
      })
    res.json(addScore)
    res.json(deleteScore)

    //logger.teacherLog.log('info','add score success')
}

const errorTest = async(req, res)=>{
    const data = req.body


    const cheatedScore = await prisma.test.create({
        
        select:{
            station_Id:true,
            student_id:true,


        },
        data: {            station_Id:data.station_Id,
            student_id:data.student_id,
            test_number:data.test_number,score: 0},
        // data: {
        //     test_number:2,
        //     score: 10,
        //     station_Id: "clbgnzizb0000v4ag550yepfe",
        //     student_id: "clbhmthk20000v4s4f4yu874a",
        // }
    }).catch(console.error)
    const createLog = await prisma.logEntry.create({
        data: {
          message: `${req.user} find cheated user  test score with id ${data.student_id} at station ${data.station_Id}`,
          level: "error",
          timestamp: new Date(),
        }
      })
    res.json(cheatedScore)

    //logger.teacherLog.log('info','add score success')
}



// const addScore = (req, res) => {
//     const scores = await prisma.station.tests.update({})
//     res.json({err: 'need implemented'})
// }

module.exports = {
    getAllTest,
    addScore,
    getStudenttest,
    updateTest,
    deleteTest,
    errorTest,
}