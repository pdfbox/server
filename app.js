require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb+srv://pdfboxadmin:pdfbox123456@pdfbox-i1ysw.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })

app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.json())
app.use('/', require('./routes/user'))
app.use('/google-upload', require('./routes/google-upload'))
app.listen(port)