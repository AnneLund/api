const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')

dotenv.config()

const verifyToken= (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
        const requestToken = bearerHeader.split(' ')[1]
        console.log(requestToken)
        jwt.verify(requestToken, process.env.SECRET, (err, data) => {
            if(!err){
                next()
            } else {
                res.sendStatus(403)
            }
        })
    } else {
        res.sendStatus(401)
    }
}

module.exports = {verifyToken}