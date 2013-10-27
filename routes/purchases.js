var PurchaseStatus = require('../models/enums.js').PurchaseStatus;
var purchases = [
	{
		id: 1,
		date: new Date(),
		status: PurchaseStatus.IN_PROGRESS,
		customer: {
			id: 1,
			name:"Carlos",
			surname: "Suarez"
		},
		products:[{
			id:1,
			name:"Tv",
			quantity: 2,
			price: 1499.99
		}]
	}
];

var id = 2;
exports.list = function(req,res){
	res.json(purchases);
}

exports.get = function(req, res){
	for (var i = purchases.length - 1; i >= 0; i--) {
		if (purchases[i].id == req.params.id) {
			 res.json(purchases[i]);
			 return;
		}
	}
};

exports.create = function(req, res){
  purchases.push({
  	id: id++,
  	status: PurchaseStatus.IN_PROGRESS,
  	name: req.body.name,
  	surname: req.body.surname
  });  
  res.end();
};

exports.delete = function(req, res){
	for (var i = purchases.length - 1; i >= 0; i--) {
		if (purchases[i].id == req.params.id) {
			purchases.splice(i, 1);
			res.end();
			return;
		}
	}
};
