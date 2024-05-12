const express= require('express');
const {verifyToken} = require('../utils/verifyToken')
const {create} = require('../controller/post.controller')

const router = express.Router();

router.post('/create',verifyToken,create);

module.exports=router;
