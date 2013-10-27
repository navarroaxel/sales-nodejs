var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    stock: Number,
    price: Number,
    deleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('Product', schema);
