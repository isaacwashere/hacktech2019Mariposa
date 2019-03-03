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

let updateEvent = function(request, response, selector, updater, callback) {
  if(!connected) {
    response.status(500).send('Error: unconnected to database');
    return;
  }

  EventModel.findOneAndUpdate(
    selector,
    updater,
    {new: true},
    function(error, doc) {
      if(error) {
        response.status(400).send("Error updating: "+error);
      } else if(!doc) {
        response.status(404).send("Event doesn't exist or no permissions: "+request.body.id);
      } else {
        if(callback) {
          callback(doc);
        }
        else {
          response.status(200).send('success');
        }
      }
    }
  );
}

let updateCurrentUser = function(request, response, updater, callback) {
  if(!connected) {
    response.status(500).send('Error: unconnected to database');
    return;
  }

  UserModel.findOneAndUpdate(
    {username: request.user.username},
    updater,
    {new: true},
    function(error, doc) {
      if(error) {
        response.status(400).send("Error updating: "+error);
      } else if(!doc) {
        response.status(404).send("Event doesn't exist or no permissions: "+request.body.id);
      } else {
        if(callback) {
          callback(doc);
        } else {
          response.status(200).send('success');
        }
      }
    }
  );
}

let updateOtherUsers = function(request, response, usernames, updater, callback) {
  if(!connected) {
    response.status(500).send('Error: unconnected to database');
    return;
  }

  UserModel.update(
    {username: usernames},
    updater,
    {new: true},
    function(error, doc) {
      if(error) {
        response.status(400).send("Error updating: "+error);
      } else if(!doc) {
        response.status(404).send("Event doesn't exist or no permissions: "+request.body.id);
      } else {
        if(callback) {
          callback(doc);
        } else {
          response.status(200).send('success');
        }
      }
    }
  );
}


router.post('/create', function(request, response) {
  if(!connected) {
    response.status(500).send('Error: unconnected to database');
    return;
  }

  event = new EventModel({
    id: utils.createObjectID(),
    name: request.body.name,
    organizer: request.user.username,
    invited: request.body.invited,
    going: request.body.going,
    date: request.body.date,
    publicity: request.body.publicity == "public" ? "public" : "private",
    location: request.body.location ? {
      longitude: parseFloat(request.body.location[1]),
      latitude: parseFloat(request.body.location[2]),
      name: request.body.location[0]
    } : null
  });

  event.save()
    .then(doc => {
      response.status(201).send("event created, id: "+doc.id);

      UserModel.update(
        {'username': {$in: request.body.invited}},
        {$addToSet : {invited: event.id}},
        {new: true},
        function(error, doc) {
          if(error) {
            response.status(400).send("Error updating: "+error);
          }
        }
      );

      UserModel.update(
        {'username': {$in: request.body.going}},
        {$addToSet : {going: event.id}},
        {new: true},
        function(error, doc) {
          if(error) {
            response.status(400).send("Error updating: "+error);
          }
        }
      );

      UserModel.findOneAndUpdate(
        {'username': request.user.username},
        {$addToSet: {hosting: event.id}},
        {new: true},
        function(error, doc) {
          if(error) {
            response.status(400).send("Error updating: "+error);
          }
        }
      );
    })
    .catch(error => {
      console.log(error);
      response.status(500).send('event creation failed: '+request.body.name);
    });
});

  router.delete('/delete', function(request, response) {
    if(!connected) {
      response.status(500).send('Error: unconnected to database');
      return;
    }

    EventModel.remove(
      {id: request.body.id},
      function(error, doc) {
        if(error) {
          response.status(400).send("Error removing: "+error);
        } else if(!doc) {
          response.status(404).send("Couldn't find event: "+request.body.id);
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

    EventModel.findOne({id: request.body.id, $or: [
      {organizer: request.user.username},
      {invited: request.user.username}]},
      function(error, event) {
        if(error) {
          response.status(500).send("Error searching for "+request.body.id+": "+error);
        }
        else if(!event) {
          response.status(404).send("Couldn't find event or no permissions: "+request.body.id);
        }
        else {
          response.status(200).json(
            {
              id: event.id,
              name: event.name,
              organizer: event.organizer,
              date: event.date,
              location: event.location,
              going: event.going,
              invited: event.invited
            }
          );
        }
      });
  });

  router.post('/update/details', function(request, response) {
    updateEvent(request, response,
      {id: request.body.id, organizer: request.user.username},
      {$set:
        {name: request.body.name, date: request.body.date, location: request.body.location ? {
          longitude: parseFloat(request.body.location[1]),
          latitude: parseFloat(request.body.location[2]),
          name: request.body.location[0]
        } : null}
      });
  });

  router.post('/update/invited', function(request, response) {
    updateEvent(request, response,
      {id: request.body.id, organizer: request.user.username},
      {$addToSet: {invited: {$each: (request.body.invited) }}},
      function(event){
        updateOtherUsers(request, response, request.body.invited, {$addToSet: {invited: event.id}});
      });
  });

  router.delete('/update/invited', function(request, response) {
    updateEvent(request, response,
      {id: request.body.id, organizer: request.user.username},
      {$pull: {invited: {$in: (request.body.invited)}}},
      function(event){
        updateOtherUsers(request, response, request.body.invited, {$pull: {invited: event.id}});
      });
  });

  router.post('/update/going', function(request, response) {
    updateEvent(request, response,
      {id: request.body.id, invited: request.user.username},
      {$addToSet: {going: request.user.username}},
      function(event){
        updateCurrentUser(request, response, {$addToSet: {going: event.id}});
      });
  });

  router.delete('/update/going', function(request, response) {
    updateEvent(request, response,
      {id: request.body.id, invited: request.user.username},
      {$pull: {going: request.user.username}},
      function(event){
        updateCurrentUser(request, response, {$addToSet: {going: event.id}});
      });
  });


  module.exports = router;
