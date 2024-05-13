const express = require('express');
const { createComment ,getPostComments} = require('../controller/comment.controller');
const {verifyToken} =require('../utils/verifyToken')

const router = express.Router();

router.post('/create',verifyToken,createComment);
router.get('/getpostcomments/:postId',getPostComments)


module.exports=router;