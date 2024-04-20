require('dotenv').config()
const express = require('express')
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')
const cors = require('cors'); 

//fetch from .env
const port = process.env.PORT || 4000
const mongodb_uri = process.env.MONGODB_URI 

const app = express()

//middleware
app.use(express.json()) //so we can interact with req.body in backend side
app.use(cors())
app.use((req, res, next) => {
    console.log(`Receve ${req.method} for ${req.path}`)
    next()  //pass to the next middleware functions (move to the next app.use() if they exist) in stack
})


//routes
app.use('/api/workouts', workoutRoutes)

//connect to db
mongoose.connect(mongodb_uri)
    .then(() => {
        app.listen(port, () => {
            console.log(`Example app listening on port ${port} and successfully connect with database. `)
        })
    })
    .catch((error) => {
        console.log("Error: Connect MongoDB database at server.js")
        console.log(error)
    })

//listen to the port


