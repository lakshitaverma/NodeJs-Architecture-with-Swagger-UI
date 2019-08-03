let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Post = new Schema({
    author: {
        type: String,
        required : [ true, 'author is required'],
        lowercase : true
    },
    comment: {
        type: String,
        required : [ true, 'comment is required'],
        unique : true,
        lowercase : true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', Post);
