const express = require('express')
const {showStation } = require('../controllers/nonLoginStation.controller')

const router = express.Router()

router.get('',showStation)

module.exports = router;