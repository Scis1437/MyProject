
const express = require('express');
const {handleNewUser,changePassword} = require('../controllers/register.controller');
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const router = express.Router();
router.put('/', verifyRoles(ROLES_LIST.Admin,),changePassword);
router.post('/', verifyRoles(ROLES_LIST.Admin),handleNewUser);

module.exports = router;