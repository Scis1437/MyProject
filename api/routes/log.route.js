
const morgan = require('morgan');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const { Role } = require('@prisma/client');
const loggerController = require('../controllers/logger.controller');
const verifyRoles = require("../middleware/verifyRoles");

router.get('/', verifyRoles(Role.ADMIN,Role.TEACHER) ,loggerController.getLog);

module.exports = router;


