const express = require('express')
const { getAllTest, addTest ,getStudenttest } = require('../controllers/test.controller')
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles')

// create router
const router = express.Router()

router.get('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Teacher), getAllTest)
router.post('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Teacher), addTest)
router.get('/:student_id',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Teacher,ROLES_LIST.Student),getStudenttest)
module.exports = router