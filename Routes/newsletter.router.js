const express = require("express");
const { NewsletterController, getEmailById, deleteEmail, getEmails } = require("../Controllers/newsletter.controller.js");
const { verifyToken } = require("../Middleware/verifyToken.js");

const controller = new NewsletterController();

const NewsletterRouter = express.Router();

NewsletterRouter.get("/emails", getEmails);

NewsletterRouter.get("/emails/:id", getEmailById);

NewsletterRouter.post("/emails", (req, res) => {
  controller.create(req, res);
});

// Member4Router.put("/member4/:id", (req, res) => {
//   controller.update(req, res);
// });

// Member4Router.put("/member4", updateWish);
// Member4Router.put("/member4/:id", updateWish);
NewsletterRouter.delete("/member4", deleteWish);

module.exports = { NewsletterRouter };
