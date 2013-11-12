var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now },
    status: Number,
    deleted: { type: Boolean, default: false },
    _customer: [{ type: mongoose.Schema.ObjectId, ref: 'Customer' }],
    products: {
    	_product: [{ type: mongoose.Schema.ObjectId, ref:'Product' }],
    	quantity: Number,
    	price: Number
    }
});

module.exports = mongoose.model('Purchase', schema);
