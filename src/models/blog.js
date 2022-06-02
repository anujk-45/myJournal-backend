const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String, 
    required: true
  },
  markdown: {
    type: String, 
    required: true
  },
  views: {
    type: Number,
    required: true
  },
  comments: [{
    name: {
      type: String,
      required: true
    },
    comment: {
      type: String,
      required: true
    }, 
    addedAT: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog