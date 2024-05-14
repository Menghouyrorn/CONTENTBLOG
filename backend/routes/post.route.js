const express = require("express");
const { verifyToken } = require("../utils/verifyToken");
const {
  create,
  getPosts,
  deletepost,
  updatepost,
} = require("../controller/post.controller");

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getPosts);
router.delete("/deletepost/:postId/:userId", verifyToken, deletepost);
router.put("/updatepost/:postId/:userId", verifyToken, updatepost);



module.exports = router;
