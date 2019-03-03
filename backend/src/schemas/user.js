let mongoose = require('mongoose');
let GroupSchema = require('./group.js');
let EventSchema = require('./event.js');

let UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  groups: {
    type: [String]
  },
  friends: {
    type: [String]
  },
  hosting: {
    type: [String]
  },
  invited: {
    type: [String]
  },
  going: {
    type: [String]
  },
  created_at: {
    type: Date
  }
});

module.exports = UserSchema;
