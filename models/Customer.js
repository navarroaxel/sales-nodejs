var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    deleted: { type: Boolean, default: false, required: true }
});

module.exports = mongoose.model('Customer', schema);
