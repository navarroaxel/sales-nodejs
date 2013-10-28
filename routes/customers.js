var Customer = require('../models/Customer.js');

exports.list = function(req, res, next) {
  	Customer.find({}, function(err, customers) {
		if (err) return next(err);
		res.json(customers);
	});
};

exports.get = function(req, res, next) {
	Customer.findById(req.params.id, function(err, customer) {
		if (err) return next(err);
		res.json(customer);
	});
};

exports.create = function(req, res, next) {
	Customer.create({
	  	name: req.body.name,
	  	surname: req.body.surname
  	}, function(err, customer) {
  		if (err) return next(err);
		res.end();
  	});
};

exports.update = function(req, res, next) {
	Customer.findById(req.params.id, function(err, customer) {
		if (err) return next(err);
		customer.name = req.body.name;
		customer.surname = req.body.surname;
		customer.save();
		res.end();
	});
};

exports.delete = function(req, res, next) {
	Customer.findById(req.params.id, function(err, customer) {
		if (err) return next(err);
		customer.deleted = true;
		customer.save();
		res.end();
	});
};
