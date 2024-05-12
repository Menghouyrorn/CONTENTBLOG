const express= require('express');
const {verifyToken} = require('../utils/verifyToken')
const {create,getPosts} = require('../controller/post.controller')

const router = express.Router();

router.post('/create',verifyToken,create);
router.get('/getposts',getPosts);

module.exports=router;
