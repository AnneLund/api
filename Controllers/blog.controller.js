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

const jwt = require('jsonwebtoken');

const deleteBlog = async (req, res) => {
  const blogId = req.params.id;
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
      const blog = await BlogModel.findOne({
          where: {
              id: blogId
          },
      });

      if (!blog) {
          return res.status(404).json({ message: `Bloggen med ID ${blogId} blev ikke fundet.` });
      }

      // Tjek om den aktuelle bruger er ejeren af blogindlægget eller en admin
      if (blog.author_id !== userId && roleId !== 1) {
          return res.status(403).json({ message: "Ikke tilladt. Kun ejere eller administratorer kan slette blogindlæg." });
      }

      // Hvis brugeren er ejeren eller admin, fortsæt med at slette blogindlægget
      await blog.destroy();
      res.json({ message: `Bloggen med ID ${blogId} er slettet.` });
      
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'En serverfejl opstod.' });
  }
};


  


module.exports = { BlogController, updateBlog, getBlogById, deleteBlog, getBlogs };
