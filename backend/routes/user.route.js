const express = require("express");
const { test, updateUser } = require("../controller/user.controller");
const { verifyToken } = require("../utils/verifyToken");

const router = express.Router();

router.get("/test", test);
router.put("/update/:id", verifyToken, updateUser);

module.exports = router;
