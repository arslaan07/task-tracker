const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = require('../middlewares/userSchema')
router.post('/sign-up', async (req, res) => {
    const { name, email, password, confirmPassword, country } = req.body
    try {
        if(name == '' || email == '' || password == '' || confirmPassword == '' || country == '') {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!'
            })
        }
        if(password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match!'
            })
        }
        const emailAndPassword =  {
            email,
            password
        }
        const { error } = userSchema.validate(emailAndPassword)
        if(error) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }
        const existingUser = await User.findOne({ email })
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already taken!'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const user = await User.create({
            name,
            email,
            password: hash,
            country
        })
        return res.status(201).json({
            success: true,
            message: 'User created successfully!',
            user: {
                name: user.name,
                email: user.email,
                country: user.country
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `User sign up failed, ${error.message}`
        })
    }
})

router.post('/sign-in', async (req, res) => {
    const { email, password } = req.body
    try {
        if(email == '' || password == '') {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!'
            })
        }
        const user = await User.findOne({ email })
        if(!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials!'
            })
        }
        const result = await bcrypt.compare(password, user.password)
        if(!result) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials!'
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_TOKEN, { expiresIn: '24h' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            sameSite: process.env.NODE_ENV == 'production',
            maxAge: 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            success: true,
            message: 'User login successfull!',
            user: {
                name: user.name,
                email: user.email,
                country: user.country
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `User login failed, ${error.message}`
        })
    }
})

router.get('/logout', (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0)
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Logout failed",
            error: error.message
        });
    }
});

module.exports = router