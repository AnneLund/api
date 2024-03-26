const { sequelize } = require('../Config/db.sequelize.js')
const DataTypes = require('sequelize')
const { Model } = require('sequelize')

class CommentsModel extends Model {}
CommentsModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
{
    sequelize,
    modelName: 'comments_list',
    freezeTableName: true,
    underscored: true,
    timestamps: true,
});

module.exports = CommentsModel;