
/**
 * Module dependencies.
 */

var express = require('express');
var lessMiddleware = require('less-middleware');
var routes = require('./routes');
require('mongoose').connect('mongodb://localhost/sales');
var customers = require('./routes/customers');
var products = require('./routes/products');
var purchases = require('./routes/purchases');
var http = require('http');
var path = require('path');
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(lessMiddleware({
	src: path.join(__dirname, 'public'),
	// set true to minify the css.
    compress: false
  }));

// public is the folder for static content (images, css, js, etc).
app.use(express.static(path.join(__dirname, 'public')));

// any GET that is not handle by static downloads the index page.
app.use(function(req, res, next){
	if (req.method != 'GET') {
		next();
		return;
	}
	fs.readFile(path.join(__dirname, 'public/index.html'), 'utf8', function(err, text){
        res.send(text);
    });	
});

// development only
app.configure('development', function() {
	// returns the exception detail to the client.
	app.use(express.errorHandler());
});

// routes
app.get('/api/customers', customers.list);
app.get('/api/customers/:id', customers.get);
app.post('/api/customers/', customers.create);
app.put('/api/customers/:id', customers.update);
app.delete('/api/customers/:id', customers.delete);

app.get('/api/products', products.list);
app.get('/api/products/:id', products.get);
app.post('/api/products/', products.create);
app.put('/api/products/:id', products.update);
app.delete('/api/products/:id', products.delete);

app.get('/api/purchases', purchases.list);
app.get('/api/purchases/create', purchases.createInitLoad);
app.get('/api/purchases/:id', purchases.get);
app.post('/api/purchases/', purchases.create);
app.delete('/api/purchases/:id', purchases.delete);

// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
