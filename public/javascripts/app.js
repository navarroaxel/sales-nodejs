'use strict';

// Declare app level module which depends on filters, and services
angular.module('sales', [
  'sales.controllers',
  // 'sales.filters',
  // 'sales.services',
  // 'sales.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl'
    }).
    when('/customers', {
      templateUrl: 'views/customers/list.html',
      controller: 'CustomersIndexCtrl'
    }).
    when('/customers/create', {
      templateUrl: '/views/customers/createOrEdit.html',
      controller: 'CustomersNewCtrl'
    }).
    when('/customers/edit/:id', {
      templateUrl: '/views/customers/createOrEdit.html',
      controller: 'CustomersEditCtrl'
    }).
    when('/customers/delete/:id', {
      templateUrl: '/views/customers/delete.html',
      controller: 'CustomersDeleteCtrl'
    }).
    when('/products', {
      templateUrl: 'views/products/list.html',
      controller: 'ProductsIndexCtrl'
    }).
    when('/products/create', {
      templateUrl: '/views/products/createOrEdit.html',
      controller: 'ProductsNewCtrl'
    }).
    when('/products/edit/:id', {
      templateUrl: '/views/products/createOrEdit.html',
      controller: 'ProductsEditCtrl'
    }).
    when('/products/delete/:id', {
      templateUrl: '/views/products/delete.html',
      controller: 'ProductsDeleteCtrl'
    }).
    when('/purchases', {
      templateUrl: 'views/purchases/list.html',
      controller: 'PurchasesIndexCtrl'
    }).
    when('/purchases/create', {
      templateUrl: '/views/purchases/create.html',
      controller: 'PurchasesNewCtrl'
    }).
    when('/purchases/delete/:id', {
      templateUrl: '/views/purchases/delete.html',
      controller: 'PurchasesDeleteCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
