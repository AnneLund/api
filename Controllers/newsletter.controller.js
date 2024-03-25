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
  
    if (!email) {
      return res.status(418).json({ error: "Ingen email angivet." });
    }
  
    try {
      // Kontrollerer, om emailen allerede findes i databasen
      const existingEmail = await NewsletterModel.findOne({ where: { email: email } });
  
      if (existingEmail) {
        // Emailen findes allerede, sender fejlmeddelelse tilbage
        return res.status(409).json({ error: "Emailen eksisterer allerede." });
      }
  
      // Emailen findes ikke, så opret en ny post
      const newEmail = await NewsletterModel.create({ email: email });
      return res.json({ newId: newEmail.id, message: "Email modtaget!" });
    } catch (error) {
      // Log fejlen og send en generel fejlmeddelelse tilbage
      console.error('Error:', error);
      return res.status(500).json({ error: "Der opstod en serverfejl." });
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
  console.log('Forsøger at slette email med:', req.body.email);

  try {
    const deleted = await NewsletterModel.destroy({
      where: {
        email: req.body.email,
      },
    });

    if (deleted) {
      console.log(`Emailen '${req.body.email}' er slettet.`);
      res.json({ message: "Email slettet!" });
    } else {
      console.log(`Emailen '${req.body.email}' blev ikke fundet.`);
      res.status(404).json({ error: 'Emailen blev ikke fundet.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'En serverfejl opstod.' });
  }
};


module.exports = { NewsletterController, getEmailById, deleteEmail, getEmails };
