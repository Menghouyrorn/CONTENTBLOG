const express = require('express');
const {test} = require('../controller/user.controller')

const router = express.Router();

router.get('/test',test)


module.exports =router;