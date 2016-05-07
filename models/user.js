var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    passport: {
        username: {
            type: String,
            required: 'miss username',
            unique: true,
        },
        password: {
            type: String,
            required: 'miss password',
        },
    },
    profile: {},
    administrator: Boolean,
});

module.exports = mongoose.model('user', user);
