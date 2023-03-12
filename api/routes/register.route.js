
const express = require('express');
const {handleNewUser,changePassword} = require('../controllers/register.controller');
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const { Role } = require('@prisma/client');
const router = express.Router();
router.put('/', verifyRoles(Role.ADMIN),changePassword);
router.post('/', verifyRoles(Role.ADMIN) ,handleNewUser);

module.exports = router;