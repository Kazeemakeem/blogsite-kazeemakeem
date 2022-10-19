const express = require('express')
const router = express.Router()
const { signup, signin, signout, requireSignin } = require('../controllers/auth')
const user = require('../models/user')

// validation
const {runValidation} = require('../validators')
const {userSignupValidator, userSigninValidator} = require('../validators/auth')

router.post('/signup', userSignupValidator, runValidation, signup)
router.post('/signin', userSigninValidator, runValidation, signin)
router.get('/signout', signout)

// test route for protected routes

// router.get('/secret', requireSignin, (req, res) => {

//   res.json({
//     // message: 'You have access to secret page'
//     user: req.user
//   })
// })

module.exports = router