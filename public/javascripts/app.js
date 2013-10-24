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
      controller: 'CustomersCtrl'
    }).
    when('/create', {
      templateUrl: 'views/create',
      controller: 'MyCtrl2'
    }).
    otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
