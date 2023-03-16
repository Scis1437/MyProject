const {prisma} = require('../db')
const logger = require('../controllers/logger.controller')
// const getNonLoginStudent = async (req, res) => {

//     const data = req.body
//     const studentCheck = await prisma.test.findMany({
//         where: {
//             student_id: req.query.student_id
//             // AND:student_id: req.query.student_id,
//             // test:     {
//             //     null: true
//             //   }
//         },
//         select:{
//             station_name: true,
            
//         },
//         distinct: ['station_name']    
    
        
//     })
//     res.json(studentCheck)
// }

// const getNonLoginStudent = async (req, res) => {
//     const studentCheck = await prisma.test.findMany({
//       where: {
//         student_id: req.query.student_id,
//       },
//       select:{
//         station_name: true
//       },
//       distinct: ['station_name']    
//     })
    
//     const stationCheck = await prisma.station.findMany({
//             select:{
//                 station_name:true,
//             },
//             distinct: ['station_name']    
//         })
//         //console.log(req.query.student_id)
       
    
//     // Get an array of station names from the studentCheck result
//     const stationNames = studentCheck.map(student => student.station_name)
//     const outNames = stationCheck.map(station => station.station_name);
//     // Query the station table for all stations that are not in the stationNames array
//     const nonExistingStations = await prisma.station.findMany({
//         where: {
//             station_name: {
//               notIn: [
//                 outNames
//               ]
//             }
//           },
//       select:{
//         station_name:true
//       },
//       distinct: ['station_name']
//     })
  
//     res.json(nonExistingStations)
//   }

const getNonLoginStudent = async (req, res) => {
    const studentCheck = await prisma.test.findMany({
      where: {
        student_id: req.query.student_id,
      },
      select: {
        station_name: true
      },
      distinct: ['station_name']
    })
  
    const existingStationNames = studentCheck.map(student => student.station_name);
  
    const nonExistingStations = await prisma.station.findMany({
      where: {
        NOT: {
          station_name: {
            in: existingStationNames
          }
        }
      },
      select: {
        station_name: true
      },
      distinct: ['station_name']
    })
  
    res.json(nonExistingStations)
  }
  

module.exports = {

    getNonLoginStudent,
    

}