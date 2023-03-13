const express = require('express')
const { getAllStation, addStation, deleteStation, updateStation, getStationScore } = require('../controllers/station.controller')
const { getStation } = require('../controllers/station.controller')
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');
const { Role } = require('@prisma/client');
// create router
const router = express.Router()

router.get('/:station_name',verifyRoles(Role.ADMIN,Role.TEACHER), getStationScore)
router.get('/:id',verifyRoles(Role.ADMIN,Role.TEACHER), getStation)
router.get('/',verifyRoles(Role.ADMIN,Role.TEACHER), getAllStation)
router.delete('/',verifyRoles(Role.ADMIN,Role.TEACHER), deleteStation)
router.put('/',verifyRoles(Role.ADMIN,Role.TEACHER), updateStation)

router.post('/',verifyRoles(Role.ADMIN,Role.TEACHER), addStation)

module.exports = router