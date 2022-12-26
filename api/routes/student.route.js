const express = require('express')
const { getAllStudent, addStudent } = require('../controllers/student.controller')
const verifyJWT = require('../middleware/verifyJWT');

// create router
const router = express.Router()

router.get('/', verifyJWT,getAllStudent)

router.post('/', addStudent)

module.exports = router