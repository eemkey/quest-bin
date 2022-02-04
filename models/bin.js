const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const dotenv = require('dotenv')
dotenv.config()

const url = process.env.MONGO_URI

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const binSchema = new mongoose.Schema({
    url: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: Date,
    requests: [{
      timestamp: Date,
      method: String,
      ip: String,
      url: String,
      headers: Map,
      body: String,
      query: String,
      ipAdd: String,
      raw: String
    }]
  })

  binSchema.plugin(uniqueValidator)

  binSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      delete returnedObject._id
      delete returnedObject.__v
      returnedObject.requests.forEach(req => {
        delete req.raw
        delete req._id
      })
    }
  })

  module.exports = mongoose.model('Bin', binSchema)
