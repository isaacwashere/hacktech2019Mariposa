let mongoose = require('mongoose');

let locationSchema = new mongoose.Schema({
  longitude: {
    type: Number,
    required: false,
  },
  latitude: {
    type: Number,
    required: false
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = locationSchema;
