var mongoose = require('mongoose');

// schema setup
var CommentSchema = new mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model('Comment', CommentSchema);