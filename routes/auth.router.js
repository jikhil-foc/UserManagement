const express = require("express");
const router = express.Router();
const { login } = require("../services/users.service");

router.post("/login", login);
module.exports = router;
