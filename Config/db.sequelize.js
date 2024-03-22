const {Sequelize} = require('sequelize');
const dotenv = require('dotenv')

dotenv.config()

const sequelize = new Sequelize(
    process.env.DB,
    process.env.USER,
    process.env.PASSWORD,
   
    {
        host: process.env.HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        dialectModule: require("mysql2")
    }
)

module.exports = {sequelize}
