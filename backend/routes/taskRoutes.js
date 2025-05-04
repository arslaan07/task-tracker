const express = require('express')
const authenticateUser = require('../middlewares/authenticateUser')
const router = express.Router()
const Task = require('../models/taskModel')
const Project = require('../models/projectModel')

router.post('/:projectId', authenticateUser, async (req, res) => {
    const { title, description, status } = req.body 
    const { projectId } = req.params
    try {
        if(title == '' || description == '') {
            return res.status(400).json({
                success: false,
                message: 'All fields are required!'
            })
        }
        let completedAt = null
        if(status == 'completed') {
            completedAt = Date.now()
        }
        const task = await Task.create({
            title,
            description,
            status,
            projectId,
            completedAt
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

router.get('/:projectId/tasks', authenticateUser, async (req, res) => {
    const { projectId } = req.params
    const page = parseInt(req.query.page) || 0; 
    const limit = parseInt(req.query.limit) || 3; 
    const search = req.query.search || '';
    try {
        if (page < 0 || limit <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid pagination parameters'
            });
        }
        const query = { projectId }
        if(search) { 
            query.$or = [
                { title: { $regex: search, $options: 'i' }},
                { description: { $regex: search, $options: 'i' }}
            ]
        }
        const tasks = await Task.find(query).sort({ createdAt: -1 })
        .skip(page * limit)
        .limit(limit)
        const totalTasks = await Task.countDocuments({ projectId })
        return res.status(200).json({
            success: true,
            message: 'Tasks fetched successfully!',
            tasks,
            totalPages: Math.ceil(totalTasks/limit)
        }) 
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Failed to fetch tasks, ${error.message}`
        })
    }
})

router.get('/:taskId', authenticateUser, async (req, res) => {
    const { taskId } = req.params
    try {
        const task = await Task.findById(taskId)
        const projectId = task.projectId 
        const project = await Project.findById(projectId)
        if(project.userId != req.user.id) {
            return res.status(400).json({
                success: false,
                message: `Not Authorized! Task does not belong to user`
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Task fetched successfully!',
            task
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
    const { title, description, status } = req.body
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
        if(status != '') {
            task.status = status
            if(status == 'completed') {
                task.completedAt = Date.now()
            }
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