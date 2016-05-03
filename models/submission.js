var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var submission = new Schema({
    userId: Schema.Types.ObjectId,
    problemListId: Schema.Types.ObjectId,
    problemIndex: Number,
    judgerId: Schema.Types.ObjectId,
    body: Schema.Types.Buffer,
    sentence: {},
});

module.exports = mongoose.model('submission', submission);
