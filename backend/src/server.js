#!/usr/bin/env node

let constants = require('./constants.js');
let utils = require('./util.js');

let path = require('path');
let send = require('request');
let express = require('express');
let querystring = require('querystring');
let cookieparser = require('cookie-parser');
let cors = require('cors');
let bodyParser = require('body-parser');
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;

let app = express();
app.use(cookieparser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(request, response) {
  response.status(200).send('visited home page');
});

app.use('/api', require('./routes/api.js'));


app.listen('4322');
console.log('Listening on 4322');
