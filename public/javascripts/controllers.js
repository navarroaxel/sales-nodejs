'use strict';

angular.module('sales.controllers', []).
  controller('HomeCtrl', function ($scope, $http) {
    $http.get('/api/purchases/dashboard')
      .success(function(data, status, headers, config) {
        $scope.purchases = data;
      }).error(function (data, status, headers, config) {
        alertService.broadcast(data);
      });
  }).
  controller('AlertDemoCtrl', function ($scope, $timeout) {
      $scope.alerts = [];

      // when receives an alert message displays the object on the notification section.
      $scope.$on("alert", function(event, alert) {
          $scope.alerts.push(alert);

          // after 5 seconds the message disappears.
          $timeout(function(){
            $scope.alerts.shift();
          }, 5000);
      });
  }).
  controller('CustomersIndexCtrl', function ($scope, $http) {
    $http.get('/api/customers')
      .success(function (data, status, headers, config) {
        $scope.customers = data;
      }).error(function (data, status, headers, config) {
        alertService.broadcast(data);
      });
  }).
  controller('CustomersNewCtrl', function ($scope, $http, $location, alertService) {
    $scope.save = function() {
       if ($scope.customerEditor.$invalid){
        alertService.broadcast("Please, review the errors and try again.");
        return;
      }

      $http.post('/api/customers/', $scope.customer)
        .success(function() {
          $location.path("/customers");
          alertService.broadcast("Customer saved successfully.");
        });
    };
  }).
  controller('CustomersEditCtrl', function ($scope, $http, $location, $routeParams, alertService) {
    $http.get('/api/customers/'+$routeParams.id)
      .success(function (data, status, headers, config) {
        $scope.customer = data;
      }).error(function (data, status, headers, config) {
        alertService.broadcast(data);
        $location.path("/customers");
      });
    $scope.save = function(){
      if ($scope.customerEditor.$invalid){
        alertService.broadcast("Please, review the errors and try again.");
        return;
      }
    
      $http.put("/api/customers/"+$routeParams.id, $scope.customer)
        .success(function() {
          alertService.broadcast("Customer updated successfully.");
          $location.path("/customers");
        });
    };
  }).
  controller('CustomersDeleteCtrl', function ($scope, $http, $location, $routeParams, alertService) {
   $http.get('/api/customers/'+$routeParams.id)
      .success(function (data, status, headers, config) {
        $scope.customer = data;
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
      console.log($location);
      $scope.delete = function(){
        $http.delete("/api/customers/" + $routeParams.id, $scope.customer)
          .success(function() {
            alertService.broadcast("Customer deleted successfully.");
            $location.path("/customers");
          });
      };
  }).
  controller('ProductsIndexCtrl', function ($scope, $http, alertService) {
    $http.get('/api/products')
      .success(function (data, status, headers, config) {
        $scope.products = data;
      }).error(function (data, status, headers, config) {
        alertService.broadcast(data);
      });
  }).
  controller('ProductsNewCtrl', function ($scope, $http, $location, alertService) {
      $scope.save = function() {
        if ($scope.productEditor.$invalid){
          alertService.broadcast("Please, review the errors and try again.");
          return;
        }

        $http.post('/api/products/', $scope.product)
          .success(function() {
            alertService.broadcast("Product saved successfully.");
            $location.path("/products");
          });
      };
  }).
  controller('ProductsEditCtrl', function ($scope, $http, $location, $routeParams, alertService) {
   $http.get('/api/products/'+$routeParams.id)
      .success(function (data, status, headers, config) {
        $scope.product = data;
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
      $scope.save = function(){
        if ($scope.productEditor.$invalid){
          alertService.broadcast("Please, review the errors and try again.");
          return;
        }

        $http.put("/api/products/"+$routeParams.id, $scope.product)
          .success(function() {
            alertService.broadcast("Product updated successfully.");
            $location.path("/products");
          });
      };
  }).
  controller('ProductsDeleteCtrl', function ($scope, $http, $location, $routeParams, alertService) {
   $http.get('/api/products/'+$routeParams.id)
      .success(function (data, status, headers, config) {
        $scope.product = data;
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
      $scope.delete = function(){
        $http.delete("/api/products/"+$routeParams.id, $scope.product)
          .success(function() {
            alertService.broadcast("Product deleted successfully.");
            $location.path("/products");
          });
      };
  }).
  controller('PurchasesIndexCtrl', function ($scope, $http) {
    $http.get('/api/purchases/list')
      .success(function (data, status, headers, config) {
        $scope.purchases = data.purchases;
        $scope.purchaseStatus = data.purchaseStatus;
        $scope.status = data.purchaseStatus[0];
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });        

    $scope.refresh = function() {
      var config = $scope.status == "Unclosed" ? { } : { params: { purchaseStatus: $scope.status } };
      $http.get('/api/purchases', config)
        .success(function (data, status, headers, config) {
          $scope.purchases = data;
        }).error(function (data, status, headers, config) {
          $scope.name = 'Error!'
        });        
    };

    $scope.nextStatus = function(purchase) {
      var config = $scope.status == "Unclosed" ? { } : { params: { purchaseStatus: $scope.status } };
      $http.get('/api/purchases/nextstatus/' + purchase._id, config)
        .success(function (data, status, headers, config) {
          $scope.purchases = data;
        }).error(function (data, status, headers, config) {
          $scope.name = 'Error!'
        });
    }
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
      angular.forEach($scope.purchasedProducts, function(value, key) {
        products.push({
          product_id: value.product._id,
          quantity: value.quantity,
        });
      });

      $http.post('/api/purchases/', {_customer: $scope.customer._id, products: products})
        .success(function() {
          $location.path("/purchases");
        });
    };
  }).
  controller('PurchasesDeleteCtrl', function ($scope, $http, $location, $routeParams) {
   $http.get('/api/purchases/' + $routeParams.id)
      .success(function (data, status, headers, config) {
        $scope.purchase = data;
      }).error(function (data, status, headers, config) {
        $scope.name = 'Error!'
      });
      $scope.delete = function() {
        $http.delete("/api/purchases/" + $routeParams.id, $scope.product)
          .success(function() {
            console.log($location);
            $location.path("/purchases");
          });
      };
  });
