const express = require('express');
const router = express.Router();
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const { getDataFromDatabase,getDataStationScore } = require('../controllers/export.controller');
router.get('/', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Teacher),getDataFromDatabase);
router.get('/:station_id',verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Teacher), getDataStationScore);
module.exports = router;
