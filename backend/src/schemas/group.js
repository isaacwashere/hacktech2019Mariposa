let mongoose = require('mongoose');
let UserSchema = require('./user.js')

let groupSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    required: true
  },
  owner: {
    type: String,
    required: true
  },
  created_at: {
    type: Date
  }
});

module.exports = groupSchema;
