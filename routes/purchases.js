var Purchase = require('../models/Purchase.js');
var PurchaseStatus = require('../models/enums.js').PurchaseStatus;

exports.list = function(req,res){
	Purchase.find({}, function(err, purchases) {
		if (err) return next(err);
		res.json(purchases);
	});
}

exports.get = function(req, res){
	Purchase.findById(req.params.id, function(err, purchase) {
		if (err) return next(err);
		res.json(purchase);
	});
};

exports.create = function(req, res){
  Purchase.create({
	  	status: PurchaseStatus.IN_PROGRESS,
	  	name: req.body.name,
	  	surname: req.body.surname
  	}, function(err, purchase) {
  		if (err) return next(err);
		res.end();
  	});
};

exports.delete = function(req, res){
	Purchase.findById(req.params.id, function(err, purchase) {
		if (err) return next(err);
		purchase.deleted = true;
		purchase.save();
		res.end();
	});
};
