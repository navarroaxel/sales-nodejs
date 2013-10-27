'use strict';


/* Controllers */
angular.module('sales.controllers', []).
controller('HomeCtrl', function ($scope, $http) {
    
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
  }).
  controller('ProductsNewCtrl', function ($scope, $http, $location) {
      $scope.save = function() {
        $http.post('/api/products/', $scope.product)
        .success(function() {
            $location.path("/products");
          });
      }
  }).
  controller('ProductsEditCtrl', function ($scope, $http, $location, $routeParams) {
   $http.get('/api/products/'+$routeParams.id)
      .success(function (data, status, headers, config) {
        $scope.product = data;
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
      $scope.save = function(){
        $http.put("/api/products/"+$routeParams.id, $scope.product)
          .success(function() {
            $location.path("/products");
          });
      }
  }).
  controller('ProductsDeleteCtrl', function ($scope, $http, $location, $routeParams) {
   $http.get('/api/products/'+$routeParams.id)
      .success(function (data, status, headers, config) {
        $scope.product = data;
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
      console.log($location);
      $scope.delete = function(){
        $http.delete("/api/products/"+$routeParams.id, $scope.product)
        .success(function() {
      console.log($location);
            $location.path("/products");
          });
      }
  }).
  controller('PurchasesIndexCtrl', function ($scope, $http) {
    $http.get('/api/purchases')
      .success(function (data, status, headers, config) {
        $scope.purchases = data;
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
  }).
  controller('PurchasesNewCtrl', function ($scope, $http, $location) {
      $scope.save = function() {
        $http.post('/api/purchases/', $scope.purchase)
        .success(function() {
            $location.path("/purchases");
          });
      }
  }).
  controller('PurchasesDeleteCtrl', function ($scope, $http, $location, $routeParams) {
   $http.get('/api/purchases/'+$routeParams.id)
      .success(function (data, status, headers, config) {
        $scope.purchase = data;
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
      console.log($location);
      $scope.delete = function() {
        $http.delete("/api/purchases/"+$routeParams.id, $scope.product)
          .success(function() {
            console.log($location);
            $location.path("/purchases");
          });
      }
  });
