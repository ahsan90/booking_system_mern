const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const { errroHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const { roleSeedDb } = require('./helper/roleHelper')
const { defaultRolesAndUsers } = require('./config/defaultRolesAndUsers')
//const { usersCreated } = require('./config/seed')
const port = process.env.PORT || 5000
const User = require('./models/userModel')


//roleSeedDb()


const app = express()
dotenv.config()

app.listen(port, () => console.log(`Server is running on port ${port}`))
connectDB()
defaultRolesAndUsers()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', (req, res) => {
    res.send('Welcome to Booking System MERN API')
})
app.use('/api/users', require('./routes/userRoutes'))

app.use('/api/profiles', require('./routes/profileRoutes'))

app.use('/api/bookings', require('./routes/bookingRoutes'))

app.use('/api/auth', require('./routes/authRoutes'))
//app.use('/api/auth', (req,res)=>{res.send("stuff")})
app.use(errroHandler)

//console.log(User.create(usersCreated()[0]))
//console.log(Math.floor(Math.random() * 2))
