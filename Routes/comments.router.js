const express = require("express");
const { CommentsController, updateComment, getCommentById, deleteComment, getComments } = require("../Controllers/comments.controller.js");
const { verifyToken } = require("../Middleware/verifyToken.js");

const controller = new CommentsController();

const CommentsRouter = express.Router();

CommentsRouter.get("/comments", getComments);

CommentsRouter.get("/comments/:id", getCommentById);

CommentsRouter.post("/comments", (req, res) => {
  controller.create(req, res);
});

CommentsRouter.put("/comments:id", (req, res) => {
  controller.update(req, res);
});

CommentsRouter.put("/comments/:id", updateComment);
CommentsRouter.delete("/comments/:id", deleteComment);

module.exports = { CommentsRouter };


