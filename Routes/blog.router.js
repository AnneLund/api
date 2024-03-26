const express = require("express");
const { BlogController, getBlogById, updateBlog, deleteBlog, getBlogs } = require("../Controllers/blog.controller.js");
const { verifyToken } = require("../Middleware/verifyToken.js");

const controller = new BlogController();

const BlogRouter = express.Router();

BlogRouter.get("/blogs", getBlogs);

BlogRouter.get("/blogs/:id", getBlogById);

BlogRouter.post("/blogs", (req, res) => {
  controller.create(req, res);
});

BlogRouter.put("/blogs:id", (req, res) => {
  controller.update(req, res);
});

BlogRouter.put("/blogs", updateBlog);
BlogRouter.put("/blogs/:id", updateBlog);
BlogRouter.delete("/blogs/:id", verifyToken, deleteBlog);

module.exports = { BlogRouter };