var config = require('../config');
var crypto = require('crypto');

function Report(code, msg, body) {
    return {
        code: code,
        msg: msg,
        body: body
    };
}

function SuccessReport(body) {
    if (!body) body = {};
    return Report(0, 'ok', body);
}


function BUGReport(err) {
    console.log(err);
    return Report(-1, 'unexpected error', {});
}

function PermissionDeniedReport() {
    return Report(403, 'permission denied', {});
}

function Password(str) {
    return crypto.createHash(config.PasswordAlgorithm).update(str).digest('hex');
}

function NeedSignIn(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.json(PermissionDeniedReport());
    }
}

function NeedSignOut(req, res, next) {
    if (req.session.user) {
        res.json(PermissionDeniedReport());
    } else {
        next();
    }
}

function NeedUserSelf(req, res, next){
    if(req.session.user && req.session.user._id == req.params._id){
        next();
    } else {
        res.json(PermissionDeniedReport());
    }
}

function NeedAdministrator(req, res, next) {
    if (req.session.user && req.session.user.administrator) {
        next();
    } else {
        res.json(PermissionDeniedReport());
    }
}

function NotFoundReport(){
    return Report(404, 'not found', {});
}

module.exports = {
    Report: Report,
    BUGReport: BUGReport,
    SuccessReport: SuccessReport,
    NeedAdministrator: NeedAdministrator,
    NeedSignIn: NeedSignIn,
    NeedSignOut: NeedSignOut,
    Password: Password,
    NeedUserSelf: NeedUserSelf,
    NotFoundReport: NotFoundReport,
};
