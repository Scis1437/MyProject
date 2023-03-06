const express = require('express')
const { getAllStation, addStation, deleteStation, updateStation, getStationScore } = require('../controllers/station.controller')
const { getStation } = require('../controllers/station.controller')
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles')
// create router
const router = express.Router()

router.get('/:station_name',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Teacher), getStationScore)
router.get('/:id',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Teacher), getStation)
router.get('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Teacher), getAllStation)
router.delete('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Teacher), deleteStation)
router.put('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Teacher), updateStation)

router.post('/',verifyRoles(ROLES_LIST.Admin), addStation)

module.exports = router