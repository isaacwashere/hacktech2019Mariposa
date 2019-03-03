let mongoose = require('mongoose');
let EventSchema = require('../schemas/event.js');

EventSchema.pre('save', function (next) {
  let now = Date.now();
  this.created_at = now;
  next();
});

module.exports = mongoose.model('Event', EventSchema);
