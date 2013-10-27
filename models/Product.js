var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sales');

var schema = new mongoose.Schema({
    name: String,
    stock: Number,
    price: Number
});

module.exports = mongoose.model('Product', schema);