'use strict';

angular.module('sales.services', []).
  factory("alertService", function($rootScope) {
  	return {
		broadcast: function(message, type){
			$rootScope.$broadcast('alert', {
				message: message,
				type: type===undefined ? 'info' : type
			});
		}
  	};
  });
