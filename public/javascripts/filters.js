'use strict';

angular.module('sales.filters', []).
  filter('regexReplace', function () {
    return function (input, searchRegex, replaceRegex) {
      return input.replace(RegExp(searchRegex), replaceRegex);
    }
  });
