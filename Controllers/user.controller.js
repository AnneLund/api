const UserModel = require("../Models/user.model.js");
const RoleModel = require("../Models/role.model.js");

UserModel.belongsTo(RoleModel);
RoleModel.hasMany(UserModel);

class UserController {
  constructor() {
    console.log("Instance call of user controller");
  }

  list = async (req, res) => {
    const result = await UserModel.findAll({
      attributes: ["id", "username"],
      include: [
        {
          model: RoleModel,
          attributes: ["id", "role"],
        },
      ],
    });
    res.json(result);
  };

  create = async (req, res) => {
    const { username, password } = req.body;

    try {
      const existingUser = await UserModel.findOne({ where: { username } });
      if (existingUser) {
        return res.status(409).send("Brugernavnet er allerede i brug");
      }

      const user = await UserModel.create({ username, password });
      return res.json({ newId: user.id });
    } catch (error) {
      console.error("Fejl ved oprettelse af bruger:", error);
      res.status(500).send("Intern serverfejl");
    }
  };
}

module.exports = { UserController };