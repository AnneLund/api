const { sequelize } = require("../Config/db.sequelize.js");
const { DataTypes } = require("sequelize");
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");

class UserModel extends Model {}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "users_list",
    freezeTableName: true,
    underscored: true,
    createdAt: true,
    hooks: {
      beforeCreate: async (user, options) => {
        try {
          user.password = await createHash(user.password);
        } catch (error) {
          console.error("Fejl under oprettelse af password-hash:", error);
          throw new Error("Fejl under oprettelse af password-hash");
        }
      },
    },
  }
);

const createHash = async (string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedString = await bcrypt.hash(string, salt);
  return hashedString;
};

module.exports = UserModel;