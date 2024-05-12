const express = require("express");
const { test, updateUser,deleteUser,signout } = require("../controller/user.controller");
const { verifyToken } = require("../utils/verifyToken");

const router = express.Router();

router.get("/test", test);
router.put("/update/:id", verifyToken, updateUser);
router.delete('/delete/:id',verifyToken,deleteUser)
router.post('/signout',signout);


module.exports = router;
