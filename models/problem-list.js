var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var problemList = new Schema({
    name: {
        type: String,
        require: 'miss name',
        unique: true,
    },
    problemList: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('problemList', problemList);
