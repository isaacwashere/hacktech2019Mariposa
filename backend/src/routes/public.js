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

  router.get('/view', function(request, response) {
    if(!connected) {
      response.status(500).send('Error: unconnected to database');
      return;
    }

    EventModel.find({publicity: "public"},
      function(error, events) {
        if(error) {
          response.status(500).send("Error searching for public events"+error);
        }
        else if(!events) {
          response.status(404).send("Couldn't find event or no permissions: ");
        }
        else {
          response.status(200).json(events);
        }
      });
  });



  module.exports = router;
