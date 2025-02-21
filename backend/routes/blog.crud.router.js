const express = require('express');
const { upload } = require('../utils/upload');
const verifyToken=require('../middlewares/auth.verify')
const {
    addPost,
    getPost,
    updatePost,
    deletePost,
    getUserPosts,
    filterPosts
} = require('../controllers/blog.crud.controller');

const BlogRouter = express.Router();

//  Create a new post (Image required)
BlogRouter.post('/add', verifyToken, upload.single('image'), addPost);

//  Get a single post by ID
BlogRouter.get('/my-posts/:id', getPost);

//  Update a post (Image optional)
BlogRouter.put('/update/:id', verifyToken, upload.single('image'), updatePost);

//  Delete a post
BlogRouter.delete('/delete/:id', verifyToken, deletePost);

// ✅ Get all posts by a logged-in user
BlogRouter.get('/my-posts', verifyToken, getUserPosts);

// ✅ Filter posts by category or title
BlogRouter.get('/filter', filterPosts);

module.exports = BlogRouter;
