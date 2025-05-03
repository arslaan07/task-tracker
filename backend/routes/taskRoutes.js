const express = require('express')
const authenticateUser = require('../middlewares/authenticateUser')
const router = express.Router()
const Task = require('../models/taskModel')
const Project = require('../models/projectModel')

router.post('/:projectId', authenticateUser, async (req, res) => {
    const { title, description } = req.body 
    const { projectId } = req.params
    try {
        if(title == '' || description == '') {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!'
            })
        }
        const task = await Task.create({
            title,
            description,
            projectId
        })
        return res.status(201).json({
            success: true,
            message: 'Task created successfully!',
            task
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Task creation failed!, ${error.message}`
        })
    }
})

router.get('/:projectId', authenticateUser, async (req, res) => {
    const { projectId } = req.params
    try {
        const tasks = await Task.find({ projectId })
        return res.status(200).json({
            success: true,
            message: 'Tasks fetched successfully!',
            tasks
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Failed to fetch tasks, ${error.message}`
        })
    }
})

router.put('/:taskId', authenticateUser, async (req, res) => {
    const { taskId } = req.params
    const { title, description } = req.body
    try {
        const task = await Task.findById(taskId)
        if(!task) {
            return res.status(404).json({
                success: false,
                message: `Task not found!`
            })
        }
        const projectId = task.projectId 
        const project = await Project.findById(projectId)
        if(project.userId != req.user.id) {
            return res.status(400).json({
                success: false,
                message: `Not Authorized! Task does not belong to user`
            })
        }
        if(title != '') {
            task.title = title
        }
        if(description != '') {
            task.description = description
        }
        await task.save()
        return res.status(200).json({
            success: true,
            message: 'Task updated successfully!',
            task
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Task update failed!, ${error.message}`
        })
    }
})

router.delete('/:taskId', authenticateUser, async (req, res) => {
    const { taskId } = req.params
    try {
        const task = await Task.findById(taskId)
        if(!task) {
            return res.status(404).json({
                success: false,
                message: `Task not found!`
            })
        }
        const projectId = task.projectId 
        const project = await Project.findById(projectId)
        if(project.userId != req.user.id) {
            return res.status(400).json({
                success: false,
                message: `Not Authorized! Task does not belong to user`
            })
        }
       
        await task.deleteOne()
        return res.status(200).json({
            success: true,
            message: 'Task deleted successfully!',
            task
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Failed to delete task!, ${error.message}`
        })
    }
})
module.exports = router