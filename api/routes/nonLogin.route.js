const express = require('express')
const {getNonLoginStudent } = require('../controllers/nonLogin.controller')

const router = express.Router()

router.get('',getNonLoginStudent)

module.exports = router;