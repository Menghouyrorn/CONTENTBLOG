const express= require('express');
const {verifyToken} = require('../utils/verifyToken')
const {create,getPosts,deletepost} = require('../controller/post.controller')

const router = express.Router();

router.post('/create',verifyToken,create);
router.get('/getposts',getPosts);
router.delete('/deletepost/:postId/:userId',verifyToken,deletepost)

module.exports=router;
