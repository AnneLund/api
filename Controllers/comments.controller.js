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

const updateComment = async (req, res) => {
  try {
    await CommentsModel.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    res.json({
      message: "Comment updated",
    });
  } catch (err) {
    console.log(err);
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

const deleteComment = async (req, res) => {
    console.log('Forsøger at slette kommantaren med id:', req.body.id);
  
    try {
      const deleted = await CommentsModel.destroy({
        where: {
          id: req.body.id
        },
      });
  
      if (deleted) {
        console.log(`Kommentar med id '${req.body.id}' er slettet.`);
        res.json({ message: "Kommentar slettet!" });
      } else {
        console.log(`Kommentar med id '${req.body.id}' blev ikke fundet.`);
        res.status(404).json({ error: 'Kommentaren blev ikke fundet.' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'En serverfejl opstod.' });
    }
  };
  


module.exports = { CommentsController, updateComment, getCommentById, deleteComment, getComments };
