var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    deleted: { type: Boolean, default: false, required: true }
});

module.exports = mongoose.model('Product', schema);
