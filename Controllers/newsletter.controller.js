const NewsletterModel = require("../Models/newsletter.model.js");

class NewsletterController {
  constructor() {
    console.log("Instance call of roleController");
  }

  list = async (req, res) => {
    const result = await NewsletterModel.findAll({
      attributes: ["id", "email"],
    });
    res.json(result);
  };
  create = async (req, res) => {
    const { email } = req.body;
    console.log('body:', req.body)

    if (email) {
      const newEmail = await NewsletterModel.create(req.body);
      return res.json({ newId: newEmail.id, message: "Email modtaget!" });
    } else {
      res.sendStatus(418);
    }
  };

  // update = async (req, res) => {
  //   const { id, title, description, købt, image, url } = req.body;

  //   if (id) {
  //     try {
  //       const existingWish = await NewsletterModel.findByPk(id);

  //       if (existingWish) {
  //         // Perform the update
  //         await existingWish.update({
  //           title,
  //           description,
  //           købt,
  //           image,
  //           url,
  //         });

  //         res.status(200).json({ message: "Data updated successfully", id });
  //       } else {
  //         res.status(404).json({ message: "Wish not found" });
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //       res.status(500).json({ message: "Internal Server Error" });
  //     }
  //   } else {
  //     res.status(400).json({ message: "Bad Request - Missing 'id' in the request body" });
  //   }
  // };
}

const getEmails = async (req, res) => {
  try {
    const email = await NewsletterModel.findAll();
    res.send(email);
  } catch (err) {
    console.log(err);
  }
};

// const updateWish = async (req, res) => {
//   try {
//     await NewsletterModel.update(req.body, {
//       where: {
//         id: req.body.id,
//       },
//     });
//     res.json({
//       message: "Product Updated",
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

const getEmailById = async (req, res) => {
  try {
    const email = await NewsletterModel.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.send(email[0]);
  } catch (err) {
    console.log(err);
  }
};

const deleteEmail = async (req, res) => {
  try {
    await NewsletterModel.destroy({
      where: {
        id: req.body.id,
      },
    });
    res.json({ message: "Email slettet!" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { NewsletterController, getEmailById, deleteEmail, getEmails };
