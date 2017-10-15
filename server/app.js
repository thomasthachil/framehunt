var express = require('express');

var index = require('./index');
var app = express();

app.use('/', index);

module.exports = app;
