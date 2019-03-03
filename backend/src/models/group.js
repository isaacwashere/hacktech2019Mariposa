let mongoose = require('mongoose');
let GroupSchema = require('../schemas/group.js');

GroupSchema.pre('save', function (next) {
  let now = Date.now();
  this.created_at = now;
  next();
});

module.exports = mongoose.model('Group', GroupSchema);
