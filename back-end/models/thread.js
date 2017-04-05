/**
 * Created by summeradhal on 4/4/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var threadSchema = new Schema({
    username: {type: String, required: true},
    threadTitle:{type: String, required: true},
    threadTime: {type: Date},
    threadDescription:{type:String,required: true},
    threadType:{ type: String }
});

module.exports = mongoose.model('thread', threadSchema);