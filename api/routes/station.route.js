const express = require('express')
const { getAllStation, addStation } = require('../controllers/station.controller')
const { getStation } = require('../controllers/station.controller')

// create router
const router = express.Router()

router.get('/', getAllStation)
router.get('/:station_name', getStation)
router.post('/', addStation)

module.exports = router