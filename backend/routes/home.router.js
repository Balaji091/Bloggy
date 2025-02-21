const express = require("express");
const HomeRouter = express.Router();
const { getAllPosts, getPostDetails, filterPosts } = require("../controllers/home.controller");

// 🌐 Public Routes (No authentication required)
HomeRouter.get("/posts", getAllPosts);  // Get all posts
HomeRouter.get("/posts/:id", getPostDetails);  // Get post details & similar posts
HomeRouter.get("/filter", filterPosts);  // Filter by category & search by title

module.exports = HomeRouter;
