const express = require("express");
const passport = require("passport");
require("../middleware/auth")(passport);
const {
  getAllUsers,
  addUser,
  getUserDetailWithId,
  updateUser,
  deleteUser,
} = require("../services/users.service");

const router = express.Router();

router.post("/", passport.authenticate("jwt", { session: false }), addUser);

router.get("/", passport.authenticate("jwt", { session: false }), getAllUsers);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getUserDetailWithId
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateUser
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteUser
);

module.exports = router;
