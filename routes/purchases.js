var Customer = require('../models/Customer.js');
var Product = require('../models/Product.js');
var Purchase = require('../models/Purchase.js');
var PurchaseStatus = require('../models/enums.js').PurchaseStatus;

exports.list = function(req, res, next){
	Purchase.find({ deleted: false }, function(err, purchases) {
		if (err) return next(err);
		res.json(purchases);
	});
}

exports.get = function(req, res, next){
	Purchase.findById(req.params.id, function(err, purchase) {
		if (err) return next(err);
		res.json(purchase);
	});
};

exports.createInitLoad = function(req, res, next){
	Customer.find({}, function(err, customers) {
		if (err) return next(err);
		Product.find({}, function(err, products) {
			if (err) return next(err);
			res.json({
				customers: customers,
				products: products
			});
		});
	});
};

exports.create = function(req, res, next){
  Purchase.create({
	  	status: PurchaseStatus.IN_PROGRESS,
	  	name: req.body.name,
	  	surname: req.body.surname
  	}, function(err, purchase) {
  		if (err) return next(err);
		res.end();
  	});
};

exports.delete = function(req, res, next){
	Purchase.findById(req.params.id, function(err, purchase) {
		if (err) return next(err);
		purchase.deleted = true;
		purchase.save();
		res.end();
	});
};
