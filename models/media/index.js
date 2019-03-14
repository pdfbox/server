const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  author: {
    type: mongoose.Types.ObjectId,
    default: null
  }
});

module.exports = mongoose.model('media', mediaSchema);