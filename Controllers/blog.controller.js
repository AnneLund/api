const BlogModel = require("../Models/blog.model");

class BlogController {
  constructor() {
    console.log("Instance call of blogController");
  }

  list = async (req, res) => {
    const result = await BlogModel.findAll({
      attributes: ["id", "title", "content", "summary", "author", "image"],
    });
    res.json(result);
  };
  create = async (req, res) => {
    const { title, content, summary, author, image } = req.body;
  
    try {
      const newBlog = await BlogModel.create({
        title,
        content,
        summary,
        author,
        image,
      });
  
      return res.json({ newId: newBlog.id, message: "Blog oprettet!" });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: "Der opstod en serverfejl." });
    }
  };
  
  

  update = async (req, res) => {
    const { id, title, content, summary, author, image } = req.body;

    if (id) {
      try {
        const existingBlog = await BlogModel.findByPk(id);

        if (existingBlog) {
          // Perform the update
          await existingBlog.update({
            title,
            content,
            summary,
            author,
            image,
          });
          

          res.status(200).json({ message: "Data updated successfully", id });
        } else {
          res.status(404).json({ message: "Blog not found" });
        }
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      res.status(400).json({ message: "Bad Request - Missing 'id' in the request body" });
    }
  };
}

const getBlogs = async (req, res) => {
  try {
    const blog = await BlogModel.findAll();
    res.send(blog);
  } catch (err) {
    console.log(err);
  }
};

const updateBlog = async (req, res) => {
  try {
    await BlogModel.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    res.json({
      message: "Blog updated",
    });
  } catch (err) {
    console.log(err);
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await BlogModel.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.send(blog[0]);
  } catch (err) {
    console.log(err);
  }
};

const deleteBlog = async (req, res) => {
    console.log('Forsøger at slette blog med titlen:', req.body.title);
  
    try {
      const deleted = await BlogModel.destroy({
        where: {
          id: req.body.id
        },
      });
  
      if (deleted) {
        console.log(`Bloggen '${req.body.title}' er slettet.`);
        res.json({ message: "Blog slettet!" });
      } else {
        console.log(`Bloggen '${req.body.title}' blev ikke fundet.`);
        res.status(404).json({ error: 'Bloggen blev ikke fundet.' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'En serverfejl opstod.' });
    }
  };
  


module.exports = { BlogController, updateBlog, getBlogById, deleteBlog, getBlogs };
