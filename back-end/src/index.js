const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const app = express()

const router = require('./Routes/Router')

const dbUri = process.env.DB_URI
mongoose.connect(dbUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}, () => console.log('Connected to database'))

app.use(cors())

app.use(express.json())
app.use(router)

app.listen(3333, ()=> console.log('Server running on port 3333'))