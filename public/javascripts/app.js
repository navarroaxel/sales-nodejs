'use strict';

// Declare app level module which depends on filters, and services
angular.module('sales', [
  'sales.controllers',
  'sales.filters',
  'sales.services',
  'sales.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/customers', {
      templateUrl: 'views/list',
      controller: 'MyCtrl1'
    }).
    when('/create', {
      templateUrl: 'views/create',
      controller: 'MyCtrl2'
    }).
    otherwise({
      redirectTo: '/view1'
    });

  $locationProvider.html5Mode(true);
});
