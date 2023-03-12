const express = require('express');
const router = express.Router();
const { getDataFromDatabase,getDataStationScore } = require('../controllers/export.controller');
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const { Role } = require('@prisma/client');
// router.get('/export-station', getDataFromDatabase);
router.get('/', verifyRoles(Role.ADMIN,Role.TEACHER),getDataStationScore);
module.exports = router;
