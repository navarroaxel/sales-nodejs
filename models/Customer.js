var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sales');

var schema = new mongoose.Schema({
    name: String,
    surname: String
});

module.exports = mongoose.model('Customer', schema);