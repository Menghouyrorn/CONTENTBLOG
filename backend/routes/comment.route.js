const express = require('express');
const { createComment ,getPostComments,likeComment} = require('../controller/comment.controller');
const {verifyToken} =require('../utils/verifyToken')

const router = express.Router();

router.post('/create',verifyToken,createComment);
router.get('/getpostcomments/:postId',getPostComments)
router.put('/likeComment/:commentId',verifyToken,likeComment)


module.exports=router;