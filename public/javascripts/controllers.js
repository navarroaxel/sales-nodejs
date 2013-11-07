'use strict';


angular.module('sales.controllers', []).
  controller('HomeCtrl', function ($scope, $http) {
    
  }).
  controller('AlertDemoCtrl', function ($scope, $timeout) {
      $scope.alerts = [];
      $scope.$on("alert",function(event, alert){
          $scope.alerts.push(alert);

          $timeout(function(){
            $scope.alerts.splice(0, 1);
          }, 5000);
      });
  }).
  controller('CustomersIndexCtrl', function ($scope, $http) {
    $http.get('/api/customers')
      .success(function (data, status, headers, config) {
        $scope.customers = data;
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
  }).
  controller('CustomersNewCtrl', function ($scope, $http, $location, alertService) {
    $scope.save = function() {
      $http.post('/api/customers/', $scope.customer)
        .success(function() {
          $location.path("/customers");
          alertService.broadcast("customer saved.");
        });
    };
  }).
  controller('CustomersEditCtrl', function ($scope, $http, $location, $routeParams, alertService) {
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
          alertService.broadcast("customer edited.");
        });
    };
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
      };
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
      };
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
      };
  }).
  controller('ProductsDeleteCtrl', function ($scope, $http, $location, $routeParams) {
   $http.get('/api/products/'+$routeParams.id)
      .success(function (data, status, headers, config) {
        $scope.product = data;
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
      $scope.delete = function(){
        $http.delete("/api/products/"+$routeParams.id, $scope.product)
          .success(function() {
            $location.path("/products");
          });
      };
  }).
  controller('PurchasesIndexCtrl', function ($scope, $http) {
    $http.get('/api/purchases')
      .success(function (data, status, headers, config) {
        $scope.purchases = data;
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
  }).
  controller('PurchasesNewCtrl', function ($scope, $http, $location, alertService) {
    $scope.purchasedProducts = [];
    $http.get('/api/purchases/create')
      .success(function (data, status, headers, config) {
        if (data.customers.length == 0){
          alertService.broadcast("You should first create a customer to load a purchase.");
          $location.path('/customers/create');
          return;
        }
        if (data.products.length == 0){
          alertService.broadcast("You should first create a product to load a purchase.");
          $location.path('/products/create');
          return;
        }
        $scope.customers = data.customers;
        $scope.products = data.products;
        $scope.customer = data.customers[0];
        $scope.purchaseProduct = data.products[0];
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
    $scope.addProduct = function() {
      if ($scope.purchaseQuantity == undefined ||$scope.purchaseQuantity.$valid == false || $scope.purchaseProduct.$valid == false){
        alertService.broadcast('you should enter a valid quantity and a product', "danger");
        return;
      }

      $scope.addingProduct = true;

      for (var i = $scope.purchasedProducts.length - 1; i >= 0; i--) {
        if ($scope.purchasedProducts[i].product._id == $scope.purchaseProduct._id){
          $scope.purchasedProducts[i].quantity += $scope.purchaseQuantity;
          return;
        }
      }

      $scope.purchasedProducts.push({
        quantity: $scope.purchaseQuantity,
        product: $scope.purchaseProduct,
      });
    };
    $scope.removeProduct = function(id){
      for (var i = $scope.purchasedProducts.length - 1; i >= 0; i--) {
        if ($scope.purchasedProducts[i].product._id == $scope.purchaseProduct._id){
          $scope.purchasedProducts.splice(i,1);
          return;
        }
      };
    };
    $scope.total = function() {
      var total = 0;
      angular.forEach($scope.purchasedProducts, function(product){
        total += product.quantity * product.product.price;
      });
      return total;
    }
    $scope.save = function() {
      var products = [];
      // angular.forEach($scope.purchaseProducts, function(value, key) {
      //   products.push({
      //     product_id: value.product._id,
      //   });
      // });


      $http.post('/api/purchases/', {customer_id: $scope.customer._id})
        .success(function() {
          $location.path("/purchases");
        });
    };
  }).
  controller('PurchasesDeleteCtrl', function ($scope, $http, $location, $routeParams) {
   $http.get('/api/purchases/'+$routeParams.id)
      .success(function (data, status, headers, config) {
        $scope.purchase = data;
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
      $scope.delete = function() {
        $http.delete("/api/purchases/"+$routeParams.id, $scope.product)
          .success(function() {
            console.log($location);
            $location.path("/purchases");
          });
      };
  });
