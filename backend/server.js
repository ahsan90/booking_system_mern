const express = require('express')
const dotenv = require('dotenv').config()
const {errorHandler, errroHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))

app.use(errroHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`))