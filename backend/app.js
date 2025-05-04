const express = require('express')
const app = express()
const userRoutes = require('./routes/userRoutes')
const projectRoutes = require('./routes/projectRoutes')
const taskRoutes = require('./routes/taskRoutes')
const connectDB = require('./connection/mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
connectDB() 

const allowedOrigin = [
    process.env.FRONTEND_DEVELOPMENT_URL,
    process.env.FRONTEND_PRODUCTION_URL
]
app.use(cors({
    origin: allowedOrigin, 
    credentials: true,
    methods: "GET,POST,PUT,DELETE"
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/project', projectRoutes)
app.use('/api/v1/task', taskRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})