const mongoose = require('mongoose')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
    required: true,
    max: 32,
    unique: true,
    index: true,
    lowercase: true
  },
  name: {
    type: String,
    trim: true,
    required: true,
    max: 32,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    max: 32,
    unique: true,
    lowercase: true
  },
  profile: {
    type: String,
    required: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
  about: {
    type: String
  },
  role:{
    type: Number,
    default: 0
  },
  photo: {
    data: Buffer,
    content: String
  },
  resetPasswordLink: {
    data: String,
    default: ''
  }
},
{timestamp: true}
)

// hashing the password before sending to the server

userSchema.virtual('password')
  .set(function(password) { // dont use arrow function here because of this keyword
    // create a temporary variable called _password
    this._password = password
    // generate  salt
    this.salt = this.makeSalt()
    // encrypt password
    this.hashed_password = this.encryptPassword(password)
  })

  .get(function(){
    return this._password
  })

  // create the needed methods (encryptPassword & makeSalt)

  userSchema.methods = {

    authenticate: function(plainText){
      return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function(password){
      if(!password) return ''

      try{
        return crypto.createHmac('sha1', this.salt)
                      .update(password)
                      .digest('hex')
      } 
      
      catch(err){
        return ''
      }
    },
    makeSalt: function(){
      return (Date.now() * Math.floor(Math.random() * 100)).toString()
    }
  }


module.exports = mongoose.model('User', userSchema)