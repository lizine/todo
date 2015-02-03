//server.js


var express = require('express');
var app     = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


mongoose.connect('mongodb://lizine:node@proximus.modulusmongo.net:27017/piraPa9w'); //connect to mongodb database

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));

app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(methodOverride());

app.listen(8080);
console.log("listening on port 8080");
