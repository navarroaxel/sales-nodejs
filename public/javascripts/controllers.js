'use strict';

/* Controllers */
angular.module('sales.controllers', []).
controller('CustomersIndexCtrl', function ($scope, $http) {
    
  }).
  controller('CustomersIndexCtrl', function ($scope, $http) {
    $http.get('/api/customers')
      .success(function (data, status, headers, config) {
        $scope.customers = data;
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
  }).
  controller('CustomersNewCtrl', function ($scope, $http, $location) {
      $scope.save = function() {
        $http.post('/api/customers/', $scope.customer)
        .success(function() {
            $location.path("/customers");
          });
      }
  }).
  controller('CustomersEditCtrl', function ($scope, $http, $location, $routeParams) {
   $http.get('/api/customers/'+$routeParams.id)
      .success(function (data, status, headers, config) {
        $scope.customer = data;
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
      $scope.save = function(){
        $http.put("/api/customers/"+$routeParams.id, $scope.customer)
          .success(function() {
            $location.path("/customers");
          });
      }
  }).
  controller('CustomersDeleteCtrl', function ($scope, $http, $location, $routeParams) {
   $http.get('/api/customers/'+$routeParams.id)
      .success(function (data, status, headers, config) {
        $scope.customer = data;
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
      console.log($location);
      $scope.delete = function(){
        $http.delete("/api/customers/"+$routeParams.id, $scope.customer)
        .success(function() {
      console.log($location);
            $location.path("/customers");
          });
      }
  }).
  controller('ProductsIndexCtrl', function ($scope, $http) {
    $http.get('/api/products')
      .success(function (data, status, headers, config) {
        $scope.products = data;
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
  });
