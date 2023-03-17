const express = require('express');
const router = express.Router();
const {errorUser,getCheated} = require('../controllers/cheated.controller');
const { Role } = require('@prisma/client');
const verifyRoles = require('../middleware/verifyRoles');
router.put('/',verifyRoles(Role.ADMIN,Role.TEACHER),errorUser);
router.get('/',verifyRoles(Role.ADMIN,Role.TEACHER),getCheated);

module.exports = router;