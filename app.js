var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
require('mongoose').connect(config.MongoDBURL);
require('./install')();
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: config.Session.Secret,
    key: config.Session.Key,
    resave: false,
    saveUninitialized: true,
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', require('./routes/api'));
app.use('/user', require('./routes/user'));
app.use('/problem', require('./routes/problem'));
app.use('/problem-list', require('./routes/problem-list'));
app.use('/judger', require('./routes/judger'));

module.exports = app;
