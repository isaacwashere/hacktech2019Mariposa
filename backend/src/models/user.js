let mongoose = require('mongoose');
let UserSchema = require('../schemas/user.js');
let bcrypt = require('bcrypt');
let SALT_WORK_FACTOR = 10;

UserSchema.pre('save', function (next) {
  let now = Date.now();
  this.created_at = now;
  next();
});

UserSchema.pre('save', function(next){

  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password'))
    return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err)
        return next(err);

      // hash the password along with our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err)
          return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
      });
    });
  });

UserSchema.methods.verifyPassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
  };




module.exports = mongoose.model('User', UserSchema);
