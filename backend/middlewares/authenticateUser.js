const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateUser = async (req, res, next) => {
    const token = req.cookies.token 
    if(!token) {
        return res.status(404).json({
            success: false,
            message: 'Not authorized!'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = authenticateUser