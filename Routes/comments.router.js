const express = require("express");
const { CommentsController, updateComment, getCommentById, getCommentsByBlogId, deleteComment, getComments } = require("../Controllers/comments.controller.js");
const { verifyToken } = require("../Middleware/verifyToken.js");

const controller = new CommentsController();

const CommentsRouter = express.Router();

CommentsRouter.get("/comments", getComments);

CommentsRouter.get("/comments/:id", getCommentById);

CommentsRouter.get("/comments/blog/:blogId", getCommentsByBlogId)

CommentsRouter.post("/comments", (req, res) => {
  controller.create(req, res);
});

CommentsRouter.put("/comments:id", verifyToken, (req, res) => {
  controller.update(req, res);
});

CommentsRouter.put("/comments/:id", verifyToken, updateComment);
CommentsRouter.delete("/comments/:id", verifyToken, deleteComment);

module.exports = { CommentsRouter };


