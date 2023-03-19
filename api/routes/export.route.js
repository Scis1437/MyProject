const express = require('express');
const router = express.Router();
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const { getDataFromDatabase,getDataStationScore } = require('../controllers/export.controller');
const { Role } = require('@prisma/client');
router.get('/',getDataFromDatabase);
router.get('/:station_id', getDataStationScore);
module.exports = router;

