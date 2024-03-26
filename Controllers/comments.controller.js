const CommentsModel = require("../Models/comments.model");

class CommentsController {
  constructor() {
    console.log("Instance call of commentsController");
  }

  list = async (req, res) => {
    const result = await CommentsModel.findAll({
      attributes: ["id", "comment", "author_id", "blog_id"],
    });
    res.json(result);
  };
  create = async (req, res) => {
    const { comment, author_id, blog_id } = req.body;
  
    try {
      const newComment = await CommentsModel.create({
        comment,
        author_id,
        blog_id
      });
  
      return res.json({ newId: newComment.id, message: "Kommentar oprettet!" });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: "Der opstod en serverfejl." });
    }
  };
  
  update = async (req, res) => {
    const { id, comment, author_id, blog_id } = req.body;

    try {
      const updated = await CommentsModel.update({ comment, author_id, blog_id }, {
        where: { id: id }
      });

      if (updated[0] > 0) {
        res.status(200).json({ message: "Kommentar opdateret" });
      } else {
        res.status(404).json({ message: "Kommentar ikke fundet" });
      }
    } catch (error) {
      res.status(500).json({ error: "Der opstod en serverfejl." });
    }
  };

}

const getComments = async (req, res) => {
  try {
    const comment = await CommentsModel.findAll();
    res.send(comment);
  } catch (err) {
    console.log(err);
  }
};

const getCommentsByBlogId = async (req, res) => {
    const blogId = req.params.blogId; // Antager, at blogId sendes som URL-parameter

    try {
      const comments = await CommentsModel.findAll({
        where: { blog_id: blogId },
        attributes: ["id", "comment", "author_id", "blog_id"], // Juster attributterne efter behov
      });

      if (comments && comments.length > 0) {
        res.json(comments);
      } else {
        res.status(404).json({ message: "Ingen kommentarer fundet for dette blogindlæg." });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: "Der opstod en serverfejl." });
    }
  };


  const updateComment = async (req, res) => {
    const commentId = req.params.id; // Antag at commentId kommer fra URL-parametre
    const { comment } = req.body; // Antager at du kun opdaterer kommentarteksten
    const userId = req.user.id; // Brugerid dekodet fra token via verifyToken middleware

    try {
        const existingComment = await CommentsModel.findByPk(commentId);

        if (!existingComment) {
            return res.status(404).json({ message: "Kommentar ikke fundet" });
        }

        // Tjek om brugeren er ejeren af kommentaren
        if (existingComment.author_id !== userId) {
            return res.status(403).json({ message: "Ikke tilladt at opdatere denne kommentar" });
        }

        // Opdater kommentaren
        await existingComment.update({ comment });
        res.json({ message: "Kommentar opdateret" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'En serverfejl opstod.' });
    }
};

const deleteComment = async (req, res) => {
    const commentId = req.params.id; // Antag at commentId kommer fra URL-parametre
    const userId = req.user.id; // Brugerid dekodet fra token via verifyToken middleware

    try {
        const existingComment = await CommentsModel.findByPk(commentId);

        if (!existingComment) {
            return res.status(404).json({ message: "Kommentar ikke fundet" });
        }

        // Tjek om brugeren er ejeren af kommentaren
        if (existingComment.author_id !== userId) {
            return res.status(403).json({ message: "Ikke tilladt at slette denne kommentar" });
        }

        // Slet kommentaren
        await existingComment.destroy();
        res.json({ message: "Kommentar slettet" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'En serverfejl opstod.' });
    }
};


const getCommentById = async (req, res) => {
    try {
      const comment = await CommentsModel.findByPk(req.params.id);

      if (comment) {
        res.json(comment);
      } else {
        res.status(404).json({ message: "Kommentar ikke fundet" });
      }
    } catch (error) {
      res.status(500).json({ error: 'En serverfejl opstod.' });
    }
  };


module.exports = { CommentsController, updateComment, getCommentById, getCommentsByBlogId, deleteComment, getComments };
