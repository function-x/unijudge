var crypto = require('crypto');
var User = require('../models/user');

function BUGReport(err){
    console.log(err);
    return {
        code: -1,
        msg: 'unexpected error',
        body: {}
    };
}
function EmptyReport(){
    return {
        code: 0,
        msg: 'ok',
        body: {}
    };
}
function getHash(str){
    return crypto.createHash('sha1').update(str).digest('hex');
}

module.exports = require('express').Router()
// sign-in API
    .post('/sign-in', function (req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        User.findOne({
            'passport.username': username,
        }, function (err, user) {
            if (err) {
                res.json(BUGReport(err));
            } else if (user) {
                if (getHash(password) == user.passport.password) {
                    user.passport.password = '';
                    req.session.user = user;
                    res.json(EmptyReport());
                } else {
                    res.json({
                        code: 201,
                        msg: 'wrong username or password',
                        body: {},
                    });
                }
            } else {
                res.json({
                    code: 202,
                    msg: 'no such user',
                    body: {},
                });
            }
        });
    })
// sign-out API
    .get('/sign-out', function (req, res, next) {
        if (req.session.user) {
            req.session.destroy();
            res.json(EmptyReport());
        } else {
            res.json({
                code: 200,
                msg: 'not login yet',
                body: {},
            });
        }
    })
// sign-up API
    .post('/sign-up', function(req, res, next) {
        var username = req.body.username;
        var password = getHash(req.body.password);
        var nickname = username;
        new User({
            passport: {
                username: username,
                password: password
            },
            profile: {
                nickname: nickname,
            }
        }).save(function(err, user){
            if(err) res.json(BUGReport(err));
            else res.json(EmptyReport());
        })
    })

// get status
    .get('/status', function (req, res, next) {
        res.json({
            code: 0,
            msg: 'ok',
            body: req.session
        });
    })
