const express = require('express');
const router = express.Router();
const { getDataFromDatabase,getDataStationScore } = require('../controllers/export.controller');
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
// router.get('/export-station', getDataFromDatabase);
router.get('/', verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Teacher),getDataStationScore);
module.exports = router;
