var products=[
	{id:1, name:"Tv", stock:3, price: 1499.99},
	{id:2, name:"Radio", stock:9, price: 50}
];

var id = 3;

exports.list = function(req,res){
	res.join(products);
}

exports.get = function(req,res){
	for (var i = products.length - 1; i >= 0; i--) {
		if (products[i].id == req.params.id){
			 res.json(products[i]);
			 return;
		}
	}
}

exports.create = function(req,res){
	products.push({
  	id:id++,
  	name:req.body.name,
  	stock:req.body.stock,
  	price: req.body.price,
  });  
  res.end();
}

exports.update = function(req,res){
	for (var i = products.length - 1; i >= 0; i--) {
		if (products[i].id == req.params.id){
			products[i].name = req.body.name;
			products[i].stock = req.body.stock;
			products[i].price = req.body.price;
			res.end();
			return;
		}
	}
}

exports.delete = function(req,res){
	for (var i = products.length - 1; i >= 0; i--) {
		if (products[i].id == req.params.id) {
			products.splice(i,1);
			res.end();
			return;
		}
	}
}
