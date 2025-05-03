const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String },
    status: { type: String, enum: ['pending', 'ongoing', 'completed'], default: 'pending' },
    completedAt: { type: Date, default: null },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
},
    { timestamps: true }
)

module.exports = mongoose.model('Task', taskSchema)