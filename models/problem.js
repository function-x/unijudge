var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var problem = new Schema({
    title: {
        type: String,
        required: 'miss title',
        unique: true,
    },
    description: {
        type: String,
        required: 'miss description',
    },
    judgeInformation: {}
});

module.exports = mongoose.model('problem', problem);
