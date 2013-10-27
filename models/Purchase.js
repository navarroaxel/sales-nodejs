var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now },
    status: Number,
    deleted: { type: Boolean, default: false },
    customer_id: mongoose.Schema.ObjectId,
    products: {
    	product_id: mongoose.Schema.ObjectId,
    	quantity: Number,
    	price: Number
    }
});

module.exports = mongoose.model('Purchase', schema);
