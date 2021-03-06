// http://underscorejs.org/
var _ = require("underscore")
var Customer = require('../models/Customer.js');
var Product = require('../models/Product.js');
var Purchase = require('../models/Purchase.js');
var purchaseStatus = require('../models/enums.js').purchaseStatus;

exports.listInitLoad = function(req, res, next){
	Purchase.find({ deleted: false, status: { $ne: 'closed' } })
		.populate('_customer')
		.exec(function(err, purchases) {
			if (err) return next(err);
			Customer.find({}, function(err, customers) {
				if (err) return next(err);
				res.json({
					purchases: purchases,
					purchaseStatus: ['Unclosed'].concat(purchaseStatus),
					customers: customers
				});
			});
		});
}

exports.list = function(req, res, next){
	var status = req.query.purchaseStatus ? req.query.purchaseStatus : { $ne: 'closed' };
	Purchase.find({ deleted: false, status: status })
		.populate('_customer')
		.exec(function(err, purchases) {
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
	Customer.find({ deleted: false }, function(err, customers) {
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
    if (!req.body.products || req.body.products.length == 0){
	    res.status(400).send('The purchase should have products.');
    }

	Customer.findById(req.body._customer, function(err, customer){
		if (err) return next(err);
		if (customer == null){
			res.status(400).send('The customer does not exist.');
		}
        
        Product.find({ _id: { $in: req.body.products.map(function(p) { return p._id; }) } }, function (err, products){
            var purchasedProducts = [];
            // for each product
            _.each(req.body.products, function(p){
                // find the product with the same id.
                var product = _.find(products, function(x) { return x._id == p._id});
                // if the product does not exist it's a bad request.
                if (!product) {
			        res.status(400).send('The product with ID: ' + p._id + ' does not exist.');
                }
                purchasedProducts.push({ _product: product._id, quantity: p.quantity, price: product.price });
            });
       
            Purchase.create({
		  	    status: purchaseStatus[0],
		  	    _customer: customer._id,
		  	    products: purchasedProducts
	  	    }, function(err, purchase) {
	  		    if (err) return next(err);
	  		    res.end();
	  	    });
        });
	});
};

exports.delete = function(req, res, next){
	Purchase.findById(req.params.id, function(err, purchase) {
		if (err) return next(err);
		if (purchase == null) {
			res.status(404).send('Purchase not found!');
			return;
		}
		purchase.deleted = true;
		purchase.save();
		res.end();
	});
};


exports.dashboard = function(req, res, next) {
    Purchase.aggregate({ $group: {
            // group by status
            _id: '$status',
            count: { $sum: 1 },
            newest: { $max: '$date' },
            oldest: { $min: '$date' }
        }}, function (err, counters) {
		    if (err) return next(err);
            Purchase.aggregate({ $match: {
                    // filter updated today
                    updatedAt: { 
                        $gt: new  Date(new Date().setHours(0, 0, 0, 0))
                    }
                }}, { $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    modified: { $max: '$updatedAt' }
                }}, function(err, todayCounters) {
		            if (err) return next(err);
                    res.json({ counters: counters, todayCounters: todayCounters });
            });
	});
}

exports.nextstatus = function(req, res, next){
	Purchase.findById(req.params.id, function(err, purchase) {
		if (err) return next(err);
		if (purchase.status == purchaseStatus[purchaseStatus.length - 1]) {
			return next('Cannot change the status of a closed purchase.');
		}
		var index = purchaseStatus.indexOf(purchase.status);
		if (index == -1) return next('Cannot change the status of the purchase, the new state is invalid.');
		purchase.status = purchaseStatus[index + 1];
		purchase.save(function(err) {
			if (err) return next(err);
			return next();
		});
	});
}
