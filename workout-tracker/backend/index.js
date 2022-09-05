require('dotenv').config()

const express = require("express")
// express app
const app = express()
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)

//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`Connected to DB and Listening to Port ${process.env.PORT}\n`)
        })
    })
    .catch((error) => {
        console.log(error)
    })