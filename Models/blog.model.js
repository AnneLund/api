const { sequelize } = require('../Config/db.sequelize.js')
const DataTypes = require('sequelize')
const { Model } = require('sequelize')

class BlogModel extends Model {}
BlogModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.CHAR,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    summary: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    author: {
        type: DataTypes.CHAR,
        allowNull: false,
    },
    image: {
        type: DataTypes.CHAR,
        allowNull: true,
    },    
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
},
{
    sequelize,
    modelName: 'blog_list',
    freezeTableName: true,
    underscored: true,
    createdAt: false,
    updatedAt: false,
}
)

module.exports = BlogModel;