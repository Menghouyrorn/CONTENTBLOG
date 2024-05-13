const express = require("express");
const { test, updateUser,deleteUser,signout,getUsers ,getUser} = require("../controller/user.controller");
const { verifyToken } = require("../utils/verifyToken");

const router = express.Router();

router.get("/test", test);
router.put("/update/:id", verifyToken, updateUser);
router.delete('/delete/:id',verifyToken,deleteUser)
router.post('/signout',signout);
router.get('/getusers',verifyToken,getUsers);
router.get('/:userId',getUser);

module.exports = router;
