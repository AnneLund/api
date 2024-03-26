const { sequelize } = require('../Config/db.sequelize.js')
const DataTypes = require('sequelize')
const { Model } = require('sequelize')

class RoleModel extends Model {}

RoleModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    role: {
        type: DataTypes.CHAR,
        allowNull: true,
    },
},
{
    sequelize,
    modelName: 'role',
    freezeTableName: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
}
)

module.exports = RoleModel;