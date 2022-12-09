const express = require('express')
const { getAllStudent, addStudent } = require('../controllers/student.controller')

// create router
const router = express.Router()

router.get('/', getAllStudent)
router.post('/:id', addStudent)

module.exports = router