'use strict';

angular.module('sales.filters', []).
  filter('regexReplace', function () {
    return function (input, searchRegex, replaceRegex) {
      return input.replace(RegExp(searchRegex), replaceRegex);
    }
  }).
  filter('purchaseStatus', function() {
  	// makes the enum value more readable.
  	return function(input){
  		switch(input){
  			case 'in_progress':
				return 'In progress';
			case 'delivered':
				return 'Delivered';
			case 'payed':
				return 'Payed';
			case 'closed':
				return 'Closed';
			default:
				return input;
  		}
  	}
  }).
  filter('fullName', function() {
    return function(input){
      return input ? input.name + ' ' + input.surname : '';
    }
  });;
