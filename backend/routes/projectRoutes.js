const express = require('express')
const router = express.Router()
const Project = require('../models/projectModel')
const authenticateUser = require('../middlewares/authenticateUser')
const { countDocuments } = require('../models/taskModel')


// create a project
router.post('/', authenticateUser, async (req, res) => {
    const { title } = req.body 

    try {
        if(title == '') {
            return res.status(400).json({
                success: false,
                message: 'title is required!'
            })
        }
        const countOfProjects = await Project.countDocuments({ userId: req.user.id })
        if(countOfProjects == 4) {
            return res.status(400).json({
                success: false,
                message: 'Max Project limit reached!'
            })
        }
        const project = await Project.create({
            title,
            userId: req.user.id
        })
        return res.status(201).json({
            success: true,
            message: 'Project created successfully!',
            project
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Failed to create project, ${error.message}`
        })
    }
})

// get all projects
router.get('/', authenticateUser, async (req, res) => {
    try {
        const projects = await Project.find({ userId: req.user.id }) 
        return res.status(200).json({
            success: true,
            message: 'Projects fetched successfully!',
            projects
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Failed to fetch projects, ${error.message}`
        })
    }
})
module.exports = router