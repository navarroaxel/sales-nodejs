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
      templateUrl: 'views/list.html',
      controller: 'CustomersIndexCtrl'
    }).
    when('/create', {
      templateUrl: '/views/createOrEdit.html',
      controller: 'CustomersNewCtrl'
    }).
    when('/edit/:id', {
      templateUrl: '/views/createOrEdit.html',
      controller: 'CustomersEditCtrl'
    }).
    when('/delete/:id', {
      templateUrl: '/views/delete.html',
      controller: 'CustomersDeleteCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
