var products=[
	{id:1, name:"Tv", stock:3, price: 1499.99},
	{id:2, name:"Radio", stock:9, price: 50}
];

var id = 3;

exports.list = function(req,res){
	res.join(products);
}

exports.get = function(req,res){
}

exports.create = function(req,res){
}

exports.update = function(req,res){
}

exports.delete = function(req,res){
}