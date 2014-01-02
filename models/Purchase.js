var purchaseStatus = require('./enums.js').purchaseStatus;
var mongoose = require('mongoose');
// https://github.com/drudge/mongoose-timestamp
var timestamps = require('mongoose-timestamp');

var schema = new mongoose.Schema({
    date: { type: Date, default: Date.now, required: true },
    status: { type: String, enum: purchaseStatus },
    deleted: { type: Boolean, default: false, required: true },
    _customer: { type: mongoose.Schema.ObjectId, ref: 'Customer', required: true },
    products: [{
    	_product: { type: mongoose.Schema.ObjectId, ref:'Product' },
    	quantity: Number,
    	price: Number
    }]
});

// For more info about the Population (ref) see: http://mongoosejs.com/docs/populate.html

schema.plugin(timestamps);
module.exports = mongoose.model('Purchase', schema);
