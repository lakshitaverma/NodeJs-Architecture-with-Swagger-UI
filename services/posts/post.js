const express = require('express');
const Post = require('../../models/post');

const getPosts = async (req, res, next) => {
    try {

        let posts = await Post.find({});

        if (posts.length > 0) {
            return res.status(200).json({
                'message': 'posts fetched successfully',
                'data': posts
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No posts found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const getPostById = async (req, res, next) => {
    try {
        let post = await Post.findById(req.params.id);
        if (post) {
            return res.status(200).json({
                'message': `post with id ${req.params.id} fetched successfully`,
                'data': post
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No posts found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const createPost = async (req, res, next) => {
    try {

        const {
            author,
            comment
        } = req.body;

        if (author === undefined || author === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'author is required',
                'field': 'author'
            });
        }

        if (comment === undefined || comment === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'comment is required',
                'field': 'comment'
            });
        }


        let isAuthorExists = await Post.findOne({
            "author": author
        });

        if (isAuthorExists) {
            return res.status(409).json({
                'code': 'ENTITY_ALREAY_EXISTS',
                'description': 'author already exists',
                'field': 'author'
            });
        }

        const temp = {
            author: author,
            comment: comment
        }

        let newPost = await Post.create(temp);

        if (newPost) {
            return res.status(201).json({
                'message': 'post created successfully',
                'data': newPost
            });
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const updatePost = async (req, res, next) => {
    try {


        const postId = req.params.id;

        const {
            author,
            comment
        } = req.body;

        if (author === undefined || author === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'author is required',
                'field': 'author'
            });
        }

        if (comment === undefined || comment === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'comment is required',
                'field': 'comment'
            });
        }


        let isPostExists = await Post.findById(postId);

        if (!isPostExists) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No post found in the system'
            });
        }

        const temp = {
            author: author,
            comment: comment
        }

        let updatePost = await Post.findByIdAndUpdate(postId, temp, {
            new: true
        });

        if (updatePost) {
            return res.status(200).json({
                'message': 'post updated successfully',
                'data': updatePost
            });
        } else {
            throw new Error('something went wrong');
        }
    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const deletePost = async (req, res, next) => {
    try {
        let post = await Post.findByIdAndRemove(req.params.id);
        if (post) {
            return res.status(204).json({
                'message': `post with id ${req.params.id} deleted successfully`
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No posts found in the system'
        });

    } catch (error) {

        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

module.exports = {
    getPosts: getPosts,
    getPostById: getPostById,
    createPost: createPost,
    updatePost: updatePost,
    deletePost: deletePost
}
