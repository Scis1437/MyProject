const express = require('express');
const handleNewUser = require('../controllers/register.controller');
const router = express.Router();
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles')


router.post('/', handleNewUser);

module.exports = router;