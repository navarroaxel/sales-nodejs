var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sales');

var schema = new mongoose.Schema({
    name: String,
    date: { type: Date, default: Date.now },
    status: Number,
    customer_id: Schema.ObjectId,
    products: {
    	product_id: Schema.ObjectId,
    	quantity: Number,
    	price: Number
    }
});

module.exports = mongoose.model('Product', schema);
