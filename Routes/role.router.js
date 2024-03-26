const express = require("express");
const { RoleController } = require("../Controllers/role.controller.js");
const { verifyToken } = require("../Middleware/verifyToken.js");

const controller = new RoleController();

const RoleRouter = express.Router();

RoleRouter.get("/role", verifyToken, (req, res) => {
  controller.list(req, res);
});

RoleRouter.post("/role", (req, res) => {
  controller.create(req, res);
});

module.exports = { RoleRouter };