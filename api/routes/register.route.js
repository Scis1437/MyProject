
const express = require('express');
const {handleNewUser,changePassword,deleteUser} = require('../controllers/register.controller');
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const { Role } = require('@prisma/client');
const router = express.Router();
router.put('/', verifyRoles(Role.ADMIN),changePassword);
router.post('/',  verifyRoles(Role.ADMIN),handleNewUser);
router.delete('/', verifyRoles(Role.ADMIN),deleteUser);
// verifyRoles(Role.ADMIN)
module.exports = router;