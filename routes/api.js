var crypto = require('crypto');
var User = require('../models/user');
var Lib = require('./lib');


module.exports = require('express').Router()
    // sign-in API
    .post('/sign-in', Lib.NeedSignOut)
    .post('/sign-in', function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        User.findOne({
            'passport.username': username,
        }, function (err, user) {
            if (err) {
                res.json(Lib.BUGReport(err));
            } else if (user) {
                if (Lib.Password(password) == user.passport.password) {
                    user.passport.password = '';
                    req.session.user = user;
                    res.json(Lib.SuccessReport());
                } else {
                    res.json(Lib.Report(201, 'wrong username or password', {}));
                }
            } else {
                res.json(Lib.NotFoundReport());
            }
        });
    })
    // sign-out API
    .get('/sign-out', Lib.NeedSignIn)
    .get('/sign-out', function (req, res, next) {
        req.session.destroy();
        res.json(Lib.SuccessReport());
    })
    // sign-up API
    .post('/sign-up', function (req, res, next) {
        var username = req.body.username;
        var password = Lib.Password(req.body.password);
        var nickname = username;
        new User({
            passport: {
                username: username,
                password: password
            },
            profile: {
                nickname: nickname,
            }
        }).save(function (err, user) {
            if (err) res.json(Lib.BUGReport(err));
            else res.json(Lib.SuccessReport());
        })
    })
    // get status
    .get('/status', function (req, res, next) {
        res.json(Lib.SuccessReport(req.session));
    })
