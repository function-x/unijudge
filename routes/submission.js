var Lib = require('./lib');
var superagent = require('superagent');
var Submission = require('../models/submission');
var Judger = require('../models/judger');

module.exports = require('express').Router()
    // add a new submission
    .post('/', Lib.NeedSignIn)
    .post('/', function (req, res, next) {
        var userId = req.session.user._id;
        var problemListId = req.body.problemListId;
        var problemIndex = req.body.problemIndex;
        var judgerId = req.body.judgerId;
        var head = req.body.head;
        var body = req.body.body;
        new Submission({
            userId: userId,
            problemListId: problemListId,
            problemIndex: problemIndex,
            judgerId: judgerId,
            head: head,
            body: body
        }).save(function (err, submission) {
            if (err) res.json(Lib.BUGReport(err));
            else {
                JudgerId.findById(judgerId, function (err, judger) {
                    if (err) res.json(Lib.BUGReport(err));
                    else if (judger) {
                        superagent.post(judger.url).send(submission).end(function (err, res) {
                            if (err) res.json(Lib.BUGReport(err));
                            else res.json(res);
                        })
                    } else res.json(Lib.Report(404, 'judger not found', {}));
                });
            }
        });
    })
    // view a submission
    .get('/:_id', function (req, res, next) {
        var submissionId = req.params._id;
        Submission.findById(submissionId, function (err, submission) {
            if (err) res.json(Lib.BUGReport(err));
            else if (submission) res.json(Lib.SuccessReport(submission));
            else res.json(Lib.Report(404, 'submission not found', {}));
        });
    })
    // update a submission
    .put('/:_id', function (req, res, next) {
        Submission.findByIdAndUpdate(req.params._id, {
            $set: {
                sentence: req.body.sentence
            }
        }, function (err, submission) {
            if (err) res.json(Lib.BUGReport(err));
            else if (submission) res.json(Lib.SuccessReport());
            else res.json(Lib.Report(404, 'submission not found', {}));
        });
    })
