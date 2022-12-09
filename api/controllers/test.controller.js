const {prisma} = require('../db')
const getAllTest = async (req, res) => {
    const tests = await prisma.station.tests.findMany({})
    res.json(tests)
}
const addTest = async(req, res)=>{
    const addScore = await prisma.test.create({
        data: {
            test_number:1,
            score: 1,
            station_Id: "clbgn4bvk0000v4kcxdozkmz2",
            student_id: "clbgnbwnk0000v49gc4vzxi30",
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