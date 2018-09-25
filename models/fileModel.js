const mongoose = require('mongoose');

module.exports = mongoose.model('File', 
  new mongoose.Schema({
    id: String,
    name: String,
    size: Number,
    mimeType: String,
    userId: String,
    accessType: {
      type: String,
      enum: ['public', 'private'],
      default: 'public'
    },
    accessToken: String,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date
  })
);