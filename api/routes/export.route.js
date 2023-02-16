const express = require('express');
const router = express.Router();
const exportController = require('../controllers/export.controller');

router.get('/', exportController.generateExcel);

module.exports = router;