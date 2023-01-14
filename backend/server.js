const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const { errroHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const { roleSeedDb } = require('./helper/roleHelper')
const { defaultRolesAndUsers } = require('./config/defaultRolesAndUsers')
const port = process.env.PORT || 5000


/* const options = {
    definition: {
        openapi: '3.0.n',
        info: {
            title: 'Booking system API',
            version: '1.0.0',
            description: 'Online Booking System (ExpressJS) API Library'
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production' ? "https://booking-system-mern-api.vercel.app" : "http://localhost:5000"
            }
        ]
    },
    apis: ['./routes/*.js']
}

const specs = swaggerJsDoc(options)
 */
const app = express()
dotenv.config()

//app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

//app.use(morgan('server_prod'))
app.listen(port, () => console.log(`Server is running on port ${port}`))
connectDB()
defaultRolesAndUsers()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())



/* app.use('/', (req, res) => {
    res.send('Welcome to Booking System MERN API')
}) */
app.use('/api/users', require('./routes/userRoutes'))

app.use('/api/profiles', require('./routes/profileRoutes'))

app.use('/api/bookings', require('./routes/bookingRoutes'))

app.use('/api/auth', require('./routes/authRoutes'))

app.use(errroHandler)

