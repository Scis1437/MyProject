const express = require('express')
const { getAllStation, addStation } = require('../controllers/station.controller')
const { getStation } = require('../controllers/station.controller')
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles')
// create router
const router = express.Router()

router.get('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Teacher), getAllStation)
router.get('/:station_name',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Teacher), getStation)
router.post('/',verifyRoles(ROLES_LIST.Admin), addStation)

module.exports = router