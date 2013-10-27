var Product = require('../models/Product.js');

exports.list = function(req,res){
	Product.find({}, function(err, products) {
		if (err) return next(err);
		res.json(products);
	});
}

exports.get = function(req,res){
	Product.findById(req.params.id, function(err, product) {
		if (err) return next(err);
		res.json(product);
	});
}

exports.create = function(req,res){
	Product.create({
	  	name: req.body.name,
	  	stock: req.body.stock,
	  	price: req.body.price
  	}, function(err, product) {
  		if (err) return next(err);
		res.end();
  	});
}

exports.update = function(req,res){
	Product.findById(req.params.id, function(err, product) {
		if (err) return next(err);
		Product.name = req.body.name;
		Product.stock = req.body.stock;
		Product.price = req.body.price;
		Product.save();
		res.end();
	});
}

exports.delete = function(req, res){
	Product.findById(req.params.id, function(err, product) {
		if (err) return next(err);
		product.deleted = true;
		product.save();
		res.end();
	});
}
