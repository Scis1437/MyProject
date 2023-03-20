const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { Role } = require('@prisma/client');
const verifyRoles = require('../middleware/verifyRoles');
router.post('/', authController.handleLogin);
router.delete('/', verifyRoles(Role.ADMIN),authController.deleteUser)

module.exports = router;