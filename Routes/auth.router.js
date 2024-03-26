const express = require('express')
const { AuthController } = require('../Controllers/auth.controller.js')

const controller = new AuthController()
const AuthRouter = express.Router()

AuthRouter.post('/login', (req, res) => {
    controller.login(req, res)

})

module.exports = { AuthRouter }