var User = require('./models/user');
var Lib = require('./routes/lib');
var config = require('./config');
module.exports = function () {
    new User({
        passport: {
            username: config.Root.Username,
            password: Lib.Password(config.Root.Password)
        },
        administrator: true
    }).save(function (err, user) {
        if (err) {
            if (err.code == 11000) {
                console.log('Root has been created');
            } else {
                console.log(Lib.BUGReport(err));
            }
        } else {
            console.log('Root', user.passport.username, 'created');
        }
    });
}