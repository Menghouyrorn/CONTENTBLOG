const express = require('express');
const { createComment ,getPostComments,likeComment,editComment} = require('../controller/comment.controller');
const {verifyToken} =require('../utils/verifyToken')

const router = express.Router();

router.post('/create',verifyToken,createComment);
router.get('/getpostcomments/:postId',getPostComments)
router.put('/likeComment/:commentId',verifyToken,likeComment)
router.put('/editComment/:commentId',verifyToken,editComment)



module.exports=router;