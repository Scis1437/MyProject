const express = require('express');
const router = express.Router();
const { getDataFromDatabase,getDataStationScore } = require('../controllers/export.controller');

router.get('/', getDataFromDatabase);
// router.get('/export-station', getDataStationScore);
module.exports = router;
