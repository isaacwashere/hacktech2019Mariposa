let mongoose = require('mongoose');
let express = require('express');
let axios = require('axios');
let cookieparser = require('cookie-parser');
let qs = require('qs');
let secrets = require('../secrets.js');
let utils = require('../util.js');
let constants = require('../constants.js');

let router = express.Router();
let UserModel = require('../models/user.js');

mongoose.connect(secrets.mongodb, {useNewUrlParser: true});

var connected = false;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  connected = true;
});

let authenticate = function(request, response, next) {
  if(request.url == '/user/create') {
    console.log('new  user');
    return next();
  }

  if(!request.body.username || !request.body.password) {
    response.status(403).send("Please provide username and password");
    return;
  }

  UserModel.findOne({username: request.body.username},
    function(error, user) {
      if(error) {
        response.status(500).send("Error searching for "+request.body.username+": "+error);
      }
      else if(!user) {
        response.status(404).send("Couldn't find user: "+request.body.username);
      }
      else {
        user.verifyPassword(request.body.password, function(error, match) {
          if(error) {
            console.log(error);
            response.status(500).send("error authenticating");
          }
          else if(match) {
            console.log(user.username + " authenticated");
            request.user = user;
            next();
          }
          else {
            response.status(403).send("incorrect password");
          }
        });
      }
    });
}

//allow public before authenticating
router.use('/public', require('./public.js'));

router.use(authenticate);
router.use('/user', require('./user.js'));
router.use('/event', require('./event.js'));
router.use('/group', require('./group.js'));

  module.exports = router;
