/**
 * Created by summeradhal on 4/4/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var discussionPostSchema = new Schema({
    username: {type: String, required: true},
    discussionTime: {type: Date},
    discussionComment:{type:String}

});

module.exports = mongoose.model('discussionPost', discussionPostSchema);