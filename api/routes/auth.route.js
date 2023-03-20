const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/', authController.handleLogin);
router.delete('/', authController.deleteUser)

module.exports = router;