const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    min: 3,
    max: 160,
    index: true,
    require: true
  },

  slug: {
    type: String,
    unique: true,
    index:true
  },

  body: {
    type: {},
    required: true,
    min: 200,
    max: 2000000,
  },

  exerpt: {
    type: String,
    required: true,
    max: 1000,
  },

  mtitle: {
    type: String,
  },

  mdesc: {
    type: String,
  },

  photo: {
    data: Buffer,
    content: String
  },

  categories: [{type: ObjectId, ref: 'Category', required: true}],
  tags: [{type: ObjectId, ref: 'Tag', required: true}],
  postedBy: {
    type: ObjectId,
    ref: 'User'
  }
},
{timestamp: true}
)

module.exports = mongoose.model('Blog', blogSchema)