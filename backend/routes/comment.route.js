const express = require('express');
const { createComment } = require('../controller/comment.controller');
const {verifyToken} =require('../utils/verifyToken')

const router = express.Router();

router.post('/create',verifyToken,createComment);

module.exports=router;