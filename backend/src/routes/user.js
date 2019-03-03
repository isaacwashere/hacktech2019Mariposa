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
let GroupModel = require('../models/group.js');
let EventModel = require('../models/event.js');
mongoose.connect(secrets.mongodb, {useNewUrlParser: true});

var connected = false;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  connected = true;
});


  router.post('/create', function(request, response) {

    if(!connected) {
      response.status(500).send('Error: unconnected to database');
      return;
    }

    user = new UserModel({
      id: utils.createObjectID(),
      username: request.body.username,
      name: request.body.name,
      email: request.body.email,
      password: request.body.password
    });

    user.save()
      .then(doc => {
        response.status(201).send("user created");
      })
      .catch(error => {
        console.log(error);
        response.status(500).send('user creation failed: '+request.body.name+' need name,email,username,password');
      });
  });

  router.get('/view', function(request, response) {
    if(!connected) {
      response.status(500).send('Error: unconnected to database');
      return;
    }

    response.status(200).json({
              id: request.user.id,
              name: request.user.name,
              email: request.user.email,
              username: request.user.username,
              hosting: request.user.hosting,
              invited: request.user.invited,
              going: request.user.going
    });
  });

  router.delete('/delete', function(request, response) {

    if(!connected) {
      response.status(500).send('Error: unconnected to database');
      return;
    }

    UserModel.remove(
      {id: request.user.id},
      function(error, doc) {
        if(error) {
          response.status(400).send("Error removing: "+error);
        } else if(!doc) {
          response.status(404).send("Couldn't find user: "+request.body.id);
        } else {
          response.status(200).send('success');
        }
      }
    );
  });

  module.exports = router;
