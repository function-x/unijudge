var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var judger = new Schema({
    name: {
        type: String,
        required: 'miss name',
        unique: true,
    },
    description: String,
    url: String,
    developer: Schema.Types.ObjectId,
    support: {},
});
module.exports = mongoose.model('judger', judger);
