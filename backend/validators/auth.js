const {check} = require('express-validator')

// signup validation

exports.userSignupValidator = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name is required'),
  check('email')
    .isEmail()
    .withMessage('email is not valid'),
  check('password')
    .isLength({min: 6})
    .withMessage('password must be at least six characters long'),
]

// signin validation

exports.userSigninValidator = [
  check('email')
    .isEmail()
    .withMessage('email is not valid'),
  check('password')
    .isLength({min: 6})
    .withMessage('password must be at least six characters long'),
]