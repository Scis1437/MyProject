const express = require('express');
const router = express.Router();
const { getDataFromDatabase,getDataStationScore } = require('../controllers/export.controller');

// router.get('/export-station', getDataFromDatabase);
router.get('/', getDataStationScore);
module.exports = router;
