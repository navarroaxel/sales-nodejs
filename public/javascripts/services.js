'use strict';

angular.module('sales.services', []).
  factory("alertService", function($rootScope) {
  	return {
		broadcast: function(message, type) {
			// broadcast send the object to all controllers that handles the alert message.
			$rootScope.$broadcast('alert', {
				message: message,
				type: type === undefined ? 'info' : type
			});
		}
  	};
  });
