const express = require('express')
const router = express.Router()
const { timeLogger } = require('../controllers/blog')

router.get('/blog', 
// it is a good practice to move all callbacks for router methods to controllers and pass just the names as appropriate
timeLogger)

module.exports = router