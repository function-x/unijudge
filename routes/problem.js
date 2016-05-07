var Lib = require('./lib');
var User = require('../models/user');

var Problem = require('../models/problem');
var Submission = require('../models/submission');
var Judger = require('../models/judger');

module.exports = require('express').Router()
    // list all problems
    .get('/', Lib.NeedAdministrator)
    .get('/', function (req, res, next) {
        Problem.find({}, function (err, problems) {
            if (err) {
                res.json(Lib.BUGReport(err));
            } else {
                res.json(Lib.SuccessReport(problems));
            }
        });
    })
    // add new problem
    .post('/', Lib.NeedAdministrator)
    .post('/', function (req, res, next) {
        new Problem({
            title: req.body.title,
            description: req.body.description,
            judgeInformation: req.body.judgeInformation
        }).save(function (err, problem) {
            if (err) res.json(Lib.BUGReport(err));
            else res.json(Lib.SuccessReport());
        });
    })
    // view a problem
    .get('/:_id', Lib.NeedAdministrator)
    .get('/:_id', function (req, res, next) {
        var problemId = req.params._id;
        Problem.findById(problemId, function (err, problem) {
            if (err) res.json(Lib.BUGReport(err));
            else if (problem) res.json(Lib.SuccessReport(problem));
            else res.json(Lib.Report(1, 'no such problem', {}));
        });
    })
    // update a problem
    .put('/:_id', Lib.NeedAdministrator)
    .put('/:_id', function (req, res, next) {
        // Warning
        Problem.findByIdAndUpdate(req.params._id, req.body, function (err, problem) {
            if (err) res.json(Lib.BUGReport(err));
            else if (problem) res.json(Lib.SuccessReport(problem));
            else res.json(Lib.Report(1, 'no such problem', {}));
        });
    })
    // delete a problem
    .delete('/:_id', Lib.NeedAdministrator)
    .delete('/:_id', function(req, res, next){
        Problem.remove({
            _id: req.params._id
        }, function(err, problem){
            if(err) res.json(Lib.BUGReport(err));
            else res.json(Lib.SuccessReport(problem));
        })
    })
