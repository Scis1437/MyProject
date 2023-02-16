const express = require('express')
const { getAllStudent, addStudent, deleteStudent, updateStudent, getStudent } = require('../controllers/student.controller')
const ROLES_LIST = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles')
//const verifyJWT = require('../middleware/verifyJWT');
//const { getStudent } = require('../controllers/student.controller')
// create router
const router = express.Router()

//router.get('/', verifyJWT,getAllStudent)
router.get('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Teacher), getAllStudent)
router.get('/:student_id',getStudent)
router.put('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Teacher), updateStudent)
router.delete('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Teacher), deleteStudent)
router.post('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Teacher), addStudent)

module.exports = router