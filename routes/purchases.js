var purchases = [
	{
		id: 1,
		date: new Date(),
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

exports.list = function(req,res){
	res.json(products);
}
