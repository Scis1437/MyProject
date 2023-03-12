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
const { Role } = require("@prisma/client");

// create router
const router = express.Router();
router.get("/:student_id", getStudenttest);
router.get("/", verifyRoles(Role.ADMIN, Role.TEACHER), getAllTest);
router.post("/", verifyRoles(Role.ADMIN,Role.TEACHER), addScore);

router.put("/", verifyRoles(Role.ADMIN,Role.TEACHER), updateTest);
router.delete(
  "/",
  verifyRoles(Role.ADMIN,Role.TEACHER),
  deleteTest
);

router.post("/:cheated", verifyRoles(Role.ADMIN,Role.TEACHER), errorTest);
module.exports = router;
