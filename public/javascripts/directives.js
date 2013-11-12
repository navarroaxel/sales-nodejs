'use strict';

/* Directives */

angular.module('sales.directives', []).
   directive('focus', function($timeout, $parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
          scope.$watch(attrs.focus, function(newValue, oldValue) {
              if (newValue) { element[0].focus(); }
          });
          element.bind("blur", function(e) {
              $timeout(function() {
                  scope.$apply(attrs.focus + "=false"); 
              }, 0);
          });
          element.bind("focus", function(e) {
              $timeout(function() {
                  scope.$apply(attrs.focus + "=true");
              }, 0);
          })
      }
    }
  }).
  directive('formInput', function($http, $compile, $templateCache, $parse) {
    return {
        restrict: 'E',
        scope: {
            label: 'bind',
            formId: 'bind'
        },
        templateUrl: 'views/directives/formInput.html',
        compile: function(scope, element, attrs){
            var type = attrs.type || 'text';
            var required = attrs.hasOwnProperty('required') ? "required='required'" : "";

            $http.get(this.templateUrl, { cache: $templateCache }).
              success(function(tplContent){
                element.replaceWith($compile(tplContent)(scope));                
              });       
        }
      }
    });
