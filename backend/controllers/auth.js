const User = require('../models/user')
const shortId = require('shortid')
const jwt = require('jsonwebtoken')
const { expressjwt: expressJwt } = require('express-jwt') 

exports.signup = (req, res) => {
  User.findOne({email: req.body.email}).exec((err, user) => {
    if(user){
      return res.status(400).json({
        error: 'Email is taken'
      })
    }
    
    const { name, email, password } = req.body
    let userName = shortId.generate()
    console.log('username', userName)
    let profile = `${process.env.CLIENT_URL}/profile/${userName}`

    let newUser = new User({ name, email, password, userName, profile })
    console.log(newUser)
    newUser.save((err, success) => {
      if(err){
        return res.status(400).json({
          error: err
        })
      }

      res.json({
        message: 'Please signin',
        user: success
      })
    })

  })
  
    // do well to test this on postman defining the body in body tab => raw => json. 
    // also install the following packages for userSchema validation:
      // express-validator - details(name, email, password) validation, 
      // jsonwebtoken - for token gen,
      // express-jwt - to compare the token on server and email for match,
      // formidable - to retrieve form data, lodash, 
      // slugify - to generate hyphenated-lowercased title slug for each blog post route, 
      //string-strip-html - to create new meta description for each blog post with the post's first few lines important for seo.
  }

  exports.signin = (req, res, next) => {

    const { email, password } = req.body
    
    // check if user exist

    User.findOne({email}).exec((err, user) => {
      if(err || !user){
        return res.status(400).json({
          error: `User with this email ${email} does not exist. Please signup`
        })
      }

      // authenticate the user password

      if(!user.authenticate(password)){
        return res.status(400).json({
          error: `Wrong password`
        })
      }

      // generate token and send to user

      const token = jwt.sign({_id: user._id}, process.env.JWT_SECRETE, { expiresIn: '1d'})

      res.cookie('token', token, {expiresIn: '1d'})

      const { _id, userName, name, email, role } = user
      return res.json({
        token,
        user: { _id, userName, name, email, role }
      })

    })
    
  }


  exports.signout = ( req, res ) => {
    res.clearCookie("token")
    res.json({
      message: "You are signed out"
    })
  }

  // for protected routes while not signed in

  exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRETE,
    requestProperty: 'user',
    algorithms: ['HS256']
    }
  )

  exports.authMiddleware = (req, res, next) => {
    const authUser = req.user._id
    User.findById({_id: authUser}).exec((err, user) => {
      if(err || !user){
        return res.status(400).json({
          error: 'User not found'
        })
      }
      req.profile = user
      next()
    })
  }


  exports.adminMiddleware = (req, res, next) => {
    const adminUser = req.user._id
    User.findById({_id: adminUser}).exec((err, user) => {
      if(err || !user){
        return res.status(400).json({
          error: 'User not found'
        })
      }

      if(user.role !== 1){
        return res.status(400).json({
          error: 'Admin resource. Access denied!'
        })
      }
      req.profile = user
      next()
    })
  }