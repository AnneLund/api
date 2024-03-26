const express = require('express');
const CommentsController = require('../Controllers/comments.controller');

// Opret kun én router instans
const CommentsRouter = express.Router();

// Endpoint for at oprette en ny kommentar
CommentsRouter.post('/', CommentsController.createComment);

// Endpoint for at hente alle kommentarer for et bestemt blogindlæg
CommentsRouter.get('/:blog_id', CommentsController.getCommentsByBlogId);

// Endpoint for at opdatere en specifik kommentar
CommentsRouter.put('/:comment_id', CommentsController.updateComment);

// Endpoint for at slette en specifik kommentar
CommentsRouter.delete('/:comment_id', CommentsController.deleteComment);

module.exports = CommentsRouter;


