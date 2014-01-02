'use strict';

angular.module('sales.filters', []).
  filter('regexReplace', function () {
    return function (input, searchRegex, replaceRegex) {
      return input.replace(RegExp(searchRegex), replaceRegex);
    }
  }).
  filter('dateTimeFormat', function ($filter) {
    var ngDateFilter = $filter('date');
    return function(date) {
       return ngDateFilter(date, 'yyyy-MM-dd HH:mm');
    }
  }).
  filter('timeFormat', function ($filter) {
    var ngDateFilter = $filter('date');
    return function(date) {
       return ngDateFilter(date, 'HH:mm');
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
    // for customers: concat the name and surname.
    return function(input){
      return input ? input.name + ' ' + input.surname : '';
    }
  });
