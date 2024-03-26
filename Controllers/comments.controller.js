const CommentsModel = require("../Models/comments.model");
const jwt = require('jsonwebtoken');

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
    const commentId = req.params.id;
    const { comment } = req.body;
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(403).json({ message: "Ingen adgang, token mangler." });
    }
  
    let userId;
    let roleId;
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      userId = decoded.user_id; // Eller hvad end dit token har af data
      roleId = decoded.role_id; // Eksempel på roller kunne være 'admin' eller 'bruger'
    } catch (error) {
      return res.status(401).json({ message: "Ugyldig eller udløbet token." });
    }
  
    if (commentId) {
      try {
        const existingComment = await CommentsModel.findByPk(blogId);
  
        if (!existingComment) {
          return res.status(404).json({ message: "Comment not found" });
        }
  
        // Tjek om den aktuelle bruger er ejeren af blogindlægget eller en admin
        if (existingComment.author_id !== userId && roleId !== 1) { // Antag at '1' repræsenterer admin rolle_id
          return res.status(403).json({ message: "Ikke tilladt. Kun ejere eller administratorer kan redigere blogindlæg." });
        }
  
        // Hvis brugeren er ejeren eller admin, fortsæt med at opdatere blogindlægget
        await existingComment.update({ comment });
        res.status(200).json({ message: "Data updated successfully", commentId });
  
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      res.status(400).json({ message: "Bad Request - Missing 'id' in the request body" });
    }
  };

  const deleteComment = async (req, res) => {
    const commentId = req.params.id;
    // Token dekodning for at få bruger-id og rolle, antager at token er sendt som "Bearer <token>"
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(403).json({ message: "Ingen adgang, token mangler." });
    }
  
    let userId;
    let roleId;
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      userId = decoded.user_id; // Eller hvad end dit token har af data
      roleId = decoded.role_id; // Eksempel på roller kunne være 'admin' eller 'bruger'
    } catch (error) {
      return res.status(401).json({ message: "Ugyldig eller udløbet token." });
    }
  
    try {
        // Hent først bloggen for at tjekke ejerskab
        const comment = await CommentsModel.findOne({
            where: {
                id: commentId
            },
        });
  
        if (!comment) {
            return res.status(404).json({ message: `Kommentar med ID ${commentId} blev ikke fundet.` });
        }
  
        // Tjek om den aktuelle bruger er ejeren af blogindlægget eller en admin
        if (comment.author_id !== userId && roleId !== 1) {
            return res.status(403).json({ message: "Ikke tilladt. Kun ejere eller administratorer kan slette blogindlæg." });
        }
  
        // Hvis brugeren er ejeren eller admin, fortsæt med at slette blogindlægget
        await comment.destroy();
        res.json({ message: `Bloggen med ID ${commentId} er slettet.` });
        
    } catch (err) {
        console.error(err);
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
