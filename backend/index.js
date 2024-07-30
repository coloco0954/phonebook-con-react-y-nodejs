require('dotenv').config()

const connectDB = require('./config/mongo')

connectDB()

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const notFound = require('./middleware/notFound')
const handleError = require('./middleware/handleError')

const personRoutes = require('./routes/persons')

app.use(express.json())

app.use(cors())

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - Body: :body'))

app.use('/api/persons', personRoutes)

app.use(notFound)

app.use(handleError)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})