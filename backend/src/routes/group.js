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

let updateGroup = function(request, response, updater) {
  if(!connected) {
    response.status(500).send('Error: unconnected to database');
    return;
  }

  GroupModel.findOneAndUpdate(
    {id: request.body.id},
    updater,
    {new: true},
    function(error, doc) {
      if(error) {
        response.status(400).send("Error updating: "+error);
      } else if(!doc) {
        response.status(404).send("Couldn't find group: "+request.body.id);
      } else {
        response.status(200).send('success');
      }
    }
  );
}

  router.post('/create', function(request, response) {

    if(!connected) {
      response.status(500).send('Error: unconnected to database');
      return;
    }

    group = new GroupModel({
      id: utils.createObjectID(),
      name: request.body.name,
      owner: request.user.username,
      members: request.body.members
    });

    group.save()
      .then(doc => {
        response.status(201).log("group created");
      })
      .catch(error => {
        response.status(500).send('user creation failed: '+request.body.name);
      });
  });

  router.delete('/delete', function(request, response) {

    if(!connected) {
      response.status(500).send('Error: unconnected to database');
      return;
    }

    GroupModel.remove(
      {id: request.body.id},
      function(error, doc) {
        if(error) {
          response.status(400).send("Error removing: "+error);
        } else if(!doc) {
          response.status(404).send("Couldn't find group: "+request.body.id);
        } else {
          response.status(200).send('success');
        }
      }
    );
  });

  router.get('/view', function(request, response) {
    if(!connected) {
      response.status(500).send('Error: unconnected to database');
      return;
    }

    GroupModel.findOne({id: request.body.id},
      function(error, group) {
        if(error) {
          response.status(500).send("Error searching for "+request.body.id+": "+error);
        }
        else if(!group) {
          response.status(404).send("Couldn't find group: "+request.body.id);
        }
        else {
          response.status(200).json(
            {
              id: group.id,
              name: group.name,
              members: group.members
            }
          );
        }
      });
  });

  router.post('/update/member', function(request, response) {
    updateGroup(request, response, {$addToSet: {members: {$each: request.body.members }}});
  });

  router.delete('/update/member', function(request, response) {
    updateEvent(request, response, {$pull: {members: {$each: request.body.members}}});
  });




  module.exports = router;
