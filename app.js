/**
 * Express modules.
 */
var express = require('express');
var favicon = require('static-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('express-error-with-sources');

/**
 * Module dependencies
 */
var lessMiddleware = require('less-middleware');
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
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(lessMiddleware(path.join(__dirname, 'public')));

// public is the folder for static content (images, css, js, etc).
app.use(express.static(path.join(__dirname, 'public')));

// development only
if (!process.env.NODE_ENV || process.env.NODE_ENV == 'development') {
    // returns the exception detail to the client.
    app.use(errorHandler());
}

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
app.get('/api/purchases/list', purchases.listInitLoad);
app.get('/api/purchases/dashboard', purchases.dashboard);
app.get('/api/purchases/nextstatus/:id', purchases.nextstatus, purchases.list);
app.get('/api/purchases/create', purchases.createInitLoad);
app.get('/api/purchases/:id', purchases.get);
app.post('/api/purchases/', purchases.create);
app.delete('/api/purchases/:id', purchases.delete);

// start server
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
