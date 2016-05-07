var Lib = require('./lib');
var User = require('../models/user');

module.exports = require('express').Router()
    // list all users
    .get('/', Lib.NeedAdministrator)
    .get('/', function (req, res, next) {
        User.find({}, function (err, users) {
            if (err) res.json(Lib.BUGReport(err));
            else res.json(Lib.SuccessReport(users.map(function (e) { e.passport.password = ''; return e; })));
        })
    })
    .put('/:_id/profile', Lib.NeedUserSelf)
    .put('/:_id/profile', function (req, res, next) {
        User.findByIdAndUpdate(req.params._id, {
            $set: {
                profile: req.body
            }
        }, function (err, user) {
            if (err) res.json(Lib.BUGReport(err));
            else if (err) res.json(Lib.SuccessReport());
            else res.json(Lib.Report(404, 'user not found', {}));
        })
    })