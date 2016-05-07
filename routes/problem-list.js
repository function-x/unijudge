var Lib = require('./lib');

var ProblemList = require('../models/problem-list');
var Problem = require('../models/problem');

module.exports = require('express').Router()
    // add a problem list
    .post('/', Lib.NeedAdministrator)
    .post('/', function (req, res, next) {
        var name = req.body.name;
        var problemList = req.body['problemList[]'];
        new ProblemList({
            name: name,
            problemList: problemList
        }).save(function (err, problemList) {
            if (err) {
                res.json(Lib.BUGReport(err));
            } else {
                res.json(Lib.SuccessReport());
            }
        });
    })
    // view a problem list
    .get('/:_id', function (req, res, next) {
        var problemListId = req.params._id;
        ProblemList.findById(problemListId, function (err, problemList) {
            if (err) res.json(Lib.BUGReport(err));
            else if (problemList) {
                Problem.find({
                    _id: {
                        $in: problemList.problemList
                    }
                }, function (err, problems) {
                    if (err) res.json(Lib.BUGReport(err));
                    else res.json(Lib.SuccessReport({
                        name: problemList.name,
                        problems: problems.map(function (e) {
                            return {
                                title: e.title,
                                description: e.description
                            };
                        })
                    }))
                })
            } else res.json(Lib.Report(1, 'no such problem list', {}));
        })
    })
    // update a problem list
    .put('/:_id', Lib.NeedAdministrator)
    .put('/:_id', function (req, res, next) {
        ProblemList.findByIdAndUpdate(req.params._id, req.body, function (err, problemList) {
            if (err) res.json(Lib.BUGReport(err));
            else res.json(Lib.SuccessReport());
        });
    })
    // delete a problem list
    .delete('/:_id', Lib.NeedAdministrator)
    .delete('/:_id', function (req, res, next) {
        ProblemList.remove({
            _id: req.params._id
        }, function (err, problemList) {
            if (err) res.json(Lib.BUGReport(err));
            else res.json(Lib.SuccessReport(problemList));
        })
    })