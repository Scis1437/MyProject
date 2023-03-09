const express = require('express')
const { getAllTeacher,addTeacher, deleteTeacher,updateTeacher } = require('../controllers/teacher.controller')
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles')
//const verifyJWT = require('../middleware/verifyJWT');
//const { getStudent } = require('../controllers/student.controller')
// create router
const router = express.Router()

//router.get('/', verifyJWT,getAllStudent)
router.get('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Teacher), getAllTeacher)
// router.get('/:student_id',getStudent)
router.put('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Teacher), updateTeacher)
router.delete('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Teacher), deleteTeacher)
router.post('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Teacher), addTeacher)

module.exports = router