const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errroHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const { roleSeedDb } = require('./helper/roleHelper')
const { existingRoles } = require('./config/predefinedRoles')
const port = process.env.PORT || 5000

connectDB()
//roleSeedDb()
existingRoles()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))

app.use('/api/clients', require('./routes/clientRoutes'))

app.use('/api/bookings', require('./routes/bookingRoutes'))

app.use('/api/auth', require('./routes/authRoutes'))
//app.use('/api/auth', (req,res)=>{res.send("stuff")})
app.use(errroHandler)

app.listen(port, () => console.log(`Server is running on port ${port}`))