const express = require("express");
const {
  getAllUsers,
  addUser,
  getUserDetailWithId,
  updateUser,
  deleteUser,
} = require("../services/users.service");

const router = express.Router();

router.post("/", addUser);

router.get("/", getAllUsers);

router.get("/:id", getUserDetailWithId);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
