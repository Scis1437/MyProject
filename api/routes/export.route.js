const express = require('express');
const router = express.Router();
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const { getDataFromDatabase,getDataStationScore } = require('../controllers/export.controller');
const { Role } = require('@prisma/client');
router.get('/', verifyRoles(Role.ADMIN, Role.TEACHER),getDataFromDatabase);
router.get('/:station_id',verifyRoles(Role.ADMIN, Role.TEACHER), getDataStationScore);
module.exports = router;
