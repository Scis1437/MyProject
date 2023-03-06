const express = require("express");
const {
  getAllTest,
  addScore,
  getStudenttest,
  updateTest,
  deleteTest,
  errorTest,
} = require("../controllers/test.controller");
const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");

// create router
const router = express.Router();
router.get("/:student_id", getStudenttest);
router.get("/", verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Teacher), getAllTest);
router.post("/", verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Teacher), addScore);

router.put("/", verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Teacher), updateTest);
router.delete(
  "/",
  verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Teacher),
  deleteTest
);

router.post("/:cheated", verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Teacher), errorTest);
module.exports = router;
