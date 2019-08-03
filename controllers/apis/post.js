const express = require('express');
const postService = require('../../services/posts/post');
let router = express.Router();

router.get('/', postService.getPosts);

router.get('/:id', postService.getPostById);

router.post('/', postService.createPost);

router.put('/:id', postService.updatePost);

router.delete('/:id', postService.deletePost);

module.exports = router;
