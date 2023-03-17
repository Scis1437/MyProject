const {prisma} = require('../db')
const user = require("../model/users.json")
const logger = require('../controllers/logger.controller')
const getCheated = async(req,res)=>{
  const showCheated = await prisma.student.findMany({
    where: {
      cheated: true,
    },
    select:{
      id: true,
      name: true,
    }
  })
  res.json(showCheated)
}
const errorUser = async(req, res)=>{
    const cheatedUser = await prisma.student.update({
        where: { id: req.body.id },
        select:{
            id: true,
        },
        data: { cheated: true },

    }).catch(console.info)
    const createLog = await prisma.logEntry.create({
        data: {
          message: `${req.user} mark student with id ${req.body.id} is cheated`,
          level: "error",
          timestamp: new Date(),
        }
      })
    res.json(cheatedUser)


}

module.exports = {errorUser,getCheated}