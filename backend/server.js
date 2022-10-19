const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

// import routes
const blogRoute = require('./routes/blog')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')


// app
const app = express()

// db
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('DB Connected'))
  .catch(err =>{
    console.log(err)
  })

// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

// cors
if(process.env.NODE_ENV === 'development'){
  //allow access to this port. This is not neccessary for postman
  app.use(cors({ origin: `${process.env.CLIENT_URL}`}))
}

// // routes === moved to routes directory
// app.get('/api', (req, res) => {
//   res.json({time: Date().toString()})
// })

// routes middleware
 app.use('/api', blogRoute)
 app.use('/api', authRoute)
 app.use('/api', userRoute)

// port
const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server is runninng on port ${port}`)
})