
const morgan = require('morgan');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const loggerController = require('../controllers/logger.controller');

router.get('/', loggerController.readLog);

module.exports = router;


