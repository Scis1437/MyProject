const express = require('express')
const { getAllTest, addTest ,getStudenttest } = require('../controllers/test.controller')

// create router
const router = express.Router()

router.get('/', getAllTest)
router.post('/', addTest)
router.get('/:student_id',getStudenttest)
module.exports = router