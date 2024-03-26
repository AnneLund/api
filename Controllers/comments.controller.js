const CommentsModel = require("../Models/comments.model.js");

class CommentsController {
    // Opret en ny kommentar
    static createComment = async (req, res) => {
        const { comment, author_id, blog_id } = req.body;

        try {
            const newComment = await CommentsModel.create({
                comment,
                author_id,
                blog_id
            });

            res.status(201).json(newComment);
        } catch (error) {
            res.status(500).json({ message: "Kunne ikke oprette kommentar", error: error.message });
        }
    };

    // Hent alle kommentarer for et specifikt blogindlæg
    static getCommentsByBlogId = async (req, res) => {
        const { blog_id } = req.params; // Antager at blog_id sendes som en URL-parameter

        try {
            const comments = await CommentsModel.findAll({
                where: { blog_id: blog_id }
            });

            res.status(200).json(comments);
        } catch (error) {
            res.status(500).json({ message: "Kunne ikke hente kommentarer", error: error.message });
        }
    };

    // Opdater en specifik kommentar
    static updateComment = async (req, res) => {
        const { comment_id } = req.params; // Antager at comment_id sendes som en URL-parameter
        const { comment } = req.body;

        try {
            const updatedComment = await CommentsModel.update({ comment }, {
                where: { id: comment_id }
            });

            if (updatedComment[0] > 0) { // Sequelize update returnerer et array, hvor første element er antal rækker ændret
                res.status(200).json({ message: "Kommentar opdateret" });
            } else {
                res.status(404).json({ message: "Kommentar ikke fundet" });
            }
        } catch (error) {
            res.status(500).json({ message: "Kunne ikke opdatere kommentar", error: error.message });
        }
    };

    // Slet en specifik kommentar
    static deleteComment = async (req, res) => {
        const { comment_id } = req.params; // Antager at comment_id sendes som en URL-parameter

        try {
            const deleted = await CommentsModel.destroy({
                where: { id: comment_id }
            });

            if (deleted) {
                res.status(200).json({ message: "Kommentar slettet" });
            } else {
                res.status(404).json({ message: "Kommentar ikke fundet" });
            }
        } catch (error) {
            res.status(500).json({ message: "Kunne ikke slette kommentar", error: error.message });
        }
    };
}

module.exports = CommentsController;
