const {sequelize} = require("../Config/db.sequelize.js")
const express = require('express')

const initRouter = express.Router()

initRouter.get('/init', (req, res) => {
    try{
        sequelize.sync()
        res.sendStatus(200)
    }
    catch{
        res.json(err)
    }
})

module.exports = {initRouter}