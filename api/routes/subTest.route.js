const express = require("express");
const {addSubTest,getAllSubTest,deleteSubTest} = require("../controllers/subtest.controller");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");

// create router
const router = express.Router();
router.get("/",verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Teacher), getAllSubTest);
// router.get("/", verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Teacher), getAllTest);
router.post("/", verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Teacher), addSubTest);
router.delete('/',verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Teacher), deleteSubTest);
module.exports = router