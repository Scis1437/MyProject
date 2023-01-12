const express = require('express')
const { getAllStudent, addStudent } = require('../controllers/student.controller')
//const verifyJWT = require('../middleware/verifyJWT');
//const { getStudent } = require('../controllers/student.controller')
// create router
const router = express.Router()

//router.get('/', verifyJWT,getAllStudent)
router.get('/',getAllStudent)
//router.get('/:id',getStudent)
router.post('/', addStudent)

module.exports = router