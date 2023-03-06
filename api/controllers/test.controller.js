const {prisma} = require('../db')
const logger = require('../controllers/logger.controller')
const getAllTest = async (req, res) => {
    const tests = await prisma.test.findMany({})
    logger.teacherLog.log('info',req.user+'show success')
    res.json(tests)
}

const getStudenttest = async (req, res) => {
    const studentCheck = await prisma.test.findMany({
        where: {
            
            student_id:  req.param.student_id,
            
            
        },
        select:{
            student_id:true,
            station_Id:true,
            test_number:true,
            score:true
        },
 
          
    })
    logger.teacherLog.log('info',req.user +' action = show ')
    res.json(studentCheck);
    //logger.teacherLog.log('info','show success')  
}
const addTest = async(req, res)=>{
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
    logger.teacherLog.log('info',[req.user,data.station_Id,data.student_id+' action = add score'])
    res.json(addScore)

    //logger.teacherLog.log('info','add score success')
}

const updateTest = async(req, res)=>{
    const data = req.body


    const updateScore = await prisma.test.updateMany({
        
        where:{
            station_Id:data.station_Id,
            student_id:data.student_id,
            test_number:data.test_number,
            // score:data.score,
        },
        
        data: {score: data.score},
        // data: {
        //     test_number:2,
        //     score: 10,
        //     station_Id: "clbgnzizb0000v4ag550yepfe",
        //     student_id: "clbhmthk20000v4s4f4yu874a",
        // }
    }).catch(console.error)
    logger.teacherLog.log('info',[req.user,data.station_Id,data.student_id+' action = update score'])
    res.json(updateScore)

    //logger.teacherLog.log('info','add score success')
}

const deleteTest = async(req, res)=>{
    const data = req.body
    const deleteScore = await prisma.test.deleteMany({
        where:{
            station_Id:data.station_Id,
            student_id:data.student_id,
            test_number:data.test_number,
            test_name:data.test_name,
            score:data.score,
        },


        // }
    })
    logger.teacherLog.log('info',[req.user,data.station_Id,data.student_id,data.test_number,data.score+' action = delete score'])
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
    logger.teacherLog.log('error',[req.user,data.station_Id,data.student_id+'This Student is Cheat'])
    res.json(cheatedScore)

    //logger.teacherLog.log('info','add score success')
}



// const addScore = (req, res) => {
//     const scores = await prisma.station.tests.update({})
//     res.json({err: 'need implemented'})
// }

module.exports = {
    getAllTest,
    addTest,
    getStudenttest,
    updateTest,
    deleteTest,
    errorTest,
}