const UserModel = require("../Models/user.model.js");
const RoleModel = require("../Models/role.model.js")
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

class AuthController {
  constructor() {
    console.log("Running Auth");
  }

  login = async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);

    if (username && password) {
      const user = await UserModel.findOne({
        attributes: ["id", "username", "password", "role_id"],
        include: [{
            model: RoleModel,
            attributes: ['role'],
          }],
        where: { username: username },
      });
      if (!user) {
        return res.status(401).json({ message: "Fejl i brugernavn/kode" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const payload = {
          user_id: user.id,
          username: user.username,
          role_id: user.role_id,
          role: user.RoleModel.role,
        };

        const token = jwt.sign(payload, process.env.SECRET);
        return res.json({ token: token, payload: payload });
      } else {
        return res.status(401).send({ message: "Fejl i brugernavn/kode" });
      }
    } else {
      return res
        .status(400)
        .send({ message: "Brugernavn og password er påkrævet" });
    }
  };
}

module.exports = { AuthController };