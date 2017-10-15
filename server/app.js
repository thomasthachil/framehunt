var express = require('express');

var index = require('./index');
var app = express();

var cors = require('cors');

app.use('/', index);

app.use(cors());

module.exports = app;
