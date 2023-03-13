
const express = require('express');
const {handleNewUser,changePassword,deleteUser} = require('../controllers/register.controller');
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const { Role } = require('@prisma/client');
const router = express.Router();
router.put('/', verifyRoles(Role.ADMIN,1),changePassword);
router.post('/', verifyRoles(Role.ADMIN,1) ,handleNewUser);
router.delete('/', verifyRoles(Role.ADMIN,1),deleteUser);

module.exports = router;