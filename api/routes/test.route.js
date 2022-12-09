const express = require('express')
const { getAllTest, addTest } = require('../controllers/test.controller')

// create router
const router = express.Router()

router.get('/', getAllTest)
router.post('/', addTest)

module.exports = router