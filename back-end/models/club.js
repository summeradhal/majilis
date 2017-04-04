/**
 * Created by summeradhal on 3/31/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clubSchema = new Schema({
    username: {type: String, required: true},
    name:  {type: String, required: true},
    type:  {type: String},
    about: {type: String}
});

module.exports = mongoose.model('club', clubSchema);