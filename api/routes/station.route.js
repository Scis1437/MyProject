const express = require('express')
const { getAllStation, addStation } = require('../controllers/station.controller')

// create router
const router = express.Router()

router.get('/', getAllStation)
router.post('/', addStation)

module.exports = router