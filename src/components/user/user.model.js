const { Schema, model } = require('mongoose')

const user = new Schema({
  user: {
    name: {
      type: String,
      required: false
    },
    nameLower: {
      type: String,
      required: false
    },
    first: {
      type: String,
      required: true
    },
    last: {
      type: String,
      required: false
    }
  },
  userId: {
    type: Number,
    required: true,
    index: {
      unique: true
    }
  }
}, {
  timestamps: true,
  autoCreate: true,
  autoIndex: true
})

user.index({ 'user.name': 1 }, {
  unique: true,
  partialFilterExpression: {
    'user.name': {
      $exists: true
    }
  }
})

user.index({ 'user.nameLower': 1 }, {
  unique: true,
  partialFilterExpression: {
    'user.name': {
      $exists: true
    }
  }
})

module.exports = { User: model('user', user) }
