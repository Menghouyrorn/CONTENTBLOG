const express = require("express");
const {
  createComment,
  getPostComments,
  getComments,
  likeComment,
  editComment,
  deleteComment,
} = require("../controller/comment.controller");
const { verifyToken } = require("../utils/verifyToken");

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getpostcomments/:postId", getPostComments);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.put("/editComment/:commentId", verifyToken, editComment);
router.delete("/deleteComment/:commentId", verifyToken, deleteComment);
router.get("/getcomments", verifyToken, getComments);

module.exports = router;
