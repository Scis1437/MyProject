const express = require('express')
const { getAllTeacher,addTeacher, deleteTeacher,updateTeacher } = require('../controllers/teacher.controller')
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');
const { Role } = require('@prisma/client');
//const verifyJWT = require('../middleware/verifyJWT');
//const { getStudent } = require('../controllers/student.controller')
// create router
const router = express.Router()

//router.get('/', verifyJWT,getAllStudent)
router.get('/',verifyRoles(Role.ADMIN,Role.TEACHER), getAllTeacher)
// router.get('/:student_id',getStudent)
router.put('/',verifyRoles(Role.ADMIN,Role.TEACHER), updateTeacher)
router.delete('/',verifyRoles(Role.ADMIN,Role.TEACHER), deleteTeacher)
router.post('/',verifyRoles(Role.ADMIN,Role.TEACHER), addTeacher)

module.exports = router