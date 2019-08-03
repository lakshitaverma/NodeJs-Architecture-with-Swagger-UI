const userController = require('../../controllers/apis/user');
const postController = require('../../controllers/apis/post');

const express = require('express');
let router = express.Router();
router.use('/users', userController);
router.use('/posts', postController);
module.exports = router;
