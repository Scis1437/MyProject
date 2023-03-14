
const express = require('express');
const {addAllStudent} = require('../controllers/excelstudent.controller');

const verifyRoles = require("../middleware/verifyRoles");
const { Role } = require('@prisma/client');
const router = express.Router();

router.post('/', verifyRoles(Role.ADMIN,Role.TEACHER) ,addAllStudent);


module.exports = router;