const express = require("express");
const {addSubTest,getAllSubTest,deleteSubTest} = require("../controllers/subtest.controller");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");
const { Role } = require("@prisma/client");

// create router
const router = express.Router();
router.get("/",verifyRoles(Role.ADMIN,Role.TEACHER), getAllSubTest);
// router.get("/", verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Teacher), getAllTest);
router.post("/", verifyRoles(Role.ADMIN,Role.TEACHER), addSubTest);
router.delete('/',verifyRoles(Role.ADMIN,Role.TEACHER), deleteSubTest);
module.exports = router