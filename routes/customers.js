var customers=[
	{id:1, name:"Carlos", surname:"Suarez"},
	{id:2, name:"Juan", surname:"Perez"}
];

var id = 3;

exports.list = function(req, res){
  res.json(customers);
};

exports.get = function(req, res){
	for (var i = customers.length - 1; i >= 0; i--) {
		if (customers[i].id == req.params.id){
			 res.json(customers[i]);
			 return;
		}
	}
};

exports.create = function(req, res){
  customers.push({
  	id:id++,
  	name:req.body.name,
  	surname:req.body.surname
  });  
  res.end();
};

exports.update = function(req, res){
	for (var i = customers.length - 1; i >= 0; i--) {
		if (customers[i].id == req.params.id){
			customers[i].name = res.body.name;
			customers[i].surname = res.body.surname;
			return;
		}
	}
	res.end();
};

exports.delete = function(req, res){
	for (var i = customers.length - 1; i >= 0; i--) {
		if (customers[i].id == req.params.id) {
			customers.splice(i,1);
			return;
		}
	}
	res.end();
};