let mongoose = require('mongoose');
let UserSchema = require('./user.js');
let LocationSchema = require('./location.js');

let eventSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  publicity: {
    type: String,
    default: "private"
  },
  name: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,
    required: true
  },
  invited: {
    type: [String]
  },
  going: {
    type: [String]
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: [LocationSchema],
  },
  created_at: {
    type: Date
  }
});

module.exports = eventSchema;
