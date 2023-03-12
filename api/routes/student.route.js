const express = require('express')
const { getAllStudent, addStudent, deleteStudent, updateStudent, getStudent } = require('../controllers/student.controller')
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');
const { Role } = require('@prisma/client');
//const verifyJWT = require('../middleware/verifyJWT');
//const { getStudent } = require('../controllers/student.controller')
// create router
const router = express.Router()

//router.get('/', verifyJWT,getAllStudent)
router.get('/',verifyRoles(Role.ADMIN,Role.TEACHER), getAllStudent)
router.get('/:student_id',getStudent)
router.put('/',verifyRoles(Role.ADMIN,Role.TEACHER), updateStudent)
router.delete('/',verifyRoles(Role.ADMIN,Role.TEACHER), deleteStudent)
router.post('/',verifyRoles(Role.ADMIN,Role.TEACHER), addStudent)

module.exports = router