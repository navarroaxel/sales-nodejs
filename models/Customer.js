var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    surname: String,
    deleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Customer', schema);
