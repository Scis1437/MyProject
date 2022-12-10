const {prisma} = require('../db')
const getAllTest = async (req, res) => {
    const tests = await prisma.test.findMany({})
    res.json(tests)
}
const addTest = async(req, res)=>{
    const addScore = await prisma.test.create({
        data: {
            test_number:2,
            score: 5,
            station_Id: "clbgnzizb0000v4ag550yepfe",
            student_id: "clbhmthk20000v4s4f4yu874a",
        }
    })
    res.json(addScore)
}

// const addScore = (req, res) => {
//     const scores = await prisma.station.tests.update({})
//     res.json({err: 'need implemented'})
// }

module.exports = {
    getAllTest,
    addTest,
}