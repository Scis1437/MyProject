const express = require('express');
const router = express.Router();
const { getDataFromDatabase,getDataStationScore } = require('../controllers/export.controller');

router.get('/', getDataFromDatabase);
router.get('/:station_id', getDataStationScore);
module.exports = router;
