'use strict';

var pennyAppServices = angular.module('pennyApp');

pennyAppServices
.factory('Thoughts', ['$resource', function ($resource) {

  return $resource('thoughts/thoughts.json', {}, {
    query: {method:'GET', isArray:true}
  });

}]);