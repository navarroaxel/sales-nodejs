var Product = require('../models/Product.js');

exports.list = function(req, res, next) {
	Product.find({}, function(err, products) {
		if (err) return next(err);
		res.json(products);
	});
}

exports.get = function(req, res, next) {
	Product.findById(req.params.id, function(err, product) {
		if (err) return next(err);
		if (product == null) {
			res.status(404).send('Product not found!');
			return;
		}
		res.json(product);
	});
}

exports.create = function(req, res, next) {
	Product.create({
	  	name: req.body.name,
	  	stock: req.body.stock,
	  	price: req.body.price
  	}, function(err, product) {
  		if (err) return next(err);
		res.end();
  	});
}

exports.update = function(req, res, next) {
	Product.findById(req.params.id, function(err, product) {
		if (err) return next(err);
		if (product == null) {
			res.status(404).send('Product not found!');
			return;
		}
		product.name = req.body.name;
		product.stock = req.body.stock;
		product.price = req.body.price;
		product.save();
		res.end();
	});
}

exports.delete = function(req, res, next) {
	Product.findById(req.params.id, function(err, product) {
		if (err) return next(err);
		if (product == null) {
			res.status(404).send('Product not found!');
			return;
		}
		product.deleted = true;
		product.save();
		res.end();
	});
}
