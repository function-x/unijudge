var Lib = require('./lib');

var Judger = require('../models/judger');

module.exports = require('express').Router()
    // Add New Judger
    .post('/', Lib.NeedSignIn)
    .post('/', function (req, res, next) {
        var name = req.body.name;
        var description = req.body.description;
        var url = req.body.url;
        var developer = req.session.user._id;
        var support = req.body.support;
        new Judger({
            name: name,
            description: description,
            url: url,
            developer: developer,
            support: support
        }).save(function (err, judger) {
            if (err) res.json(Lib.BUGReport(err));
            else res.json(Lib.SuccessReport());
        });
    })
    // Query All Judgers
    .get('/', function (req, res, next) {
        Judger.find({}, function (err, judgers) {
            if (err) res.json(Lib.BUGReport(err));
            else res.json(Lib.SuccessReport(judgers.map(function (e) {
                if(!req.session.user || !req.session.user.administrator) 
                    e.url = '';
                return e;
            })));
        });
    })
