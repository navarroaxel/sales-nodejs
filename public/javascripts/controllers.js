'use strict';

/* Controllers */
angular.module('sales.controllers', []).
  controller('CustomersIndexCtrl', function ($scope, $http) {

    $http.get('/api/customers')
      .success(function (data, status, headers, config) {
        $scope.customers = data;
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });

  }).
  controller('CustomersNewCtrl', function ($scope, $http) {
      $scope.save = function(){
        $http.post('/api/customers/', $scope.customer);
      }
  }).
  controller('CustomersEditCtrl', function ($scope, $http, $routeParams) {
   $http.get('/api/customers/'+$routeParams.id)
      .success(function (data, status, headers, config) {
        $scope.customer = data;
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
      $scope.save = function(){
        $http.put("/api/customers/"+$routeParams.id, $scope.customer);
      }
  }).
  controller('CustomersDeleteCtrl', function ($scope, $http, $routeParams) {
   $http.get('/api/customers/'+$routeParams.id)
      .success(function (data, status, headers, config) {
        $scope.customer = data;
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
      $scope.delete = function(){
        $http.delete("/api/customers/"+$routeParams.id, $scope.customer);
      }
  });
