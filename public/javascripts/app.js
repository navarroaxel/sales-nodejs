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
    when('/customers', {
      templateUrl: 'views/list.html',
      controller: 'CustomersIndexCtrl'
    }).
    when('/customers/create', {
      templateUrl: '/views/createOrEdit.html',
      controller: 'CustomersNewCtrl'
    }).
    when('/customers/edit/:id', {
      templateUrl: '/views/createOrEdit.html',
      controller: 'CustomersEditCtrl'
    }).
    when('/customers/delete/:id', {
      templateUrl: '/views/delete.html',
      controller: 'CustomersDeleteCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
