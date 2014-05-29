'use strict';

angular.module('pennyApp', [
  'ngResource',
  'ngRoute',
  'ui',
  'ui.bootstrap',
  'LocalStorageModule'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/thoughts', {
        templateUrl: 'views/thought-list.html',
        controller: 'ThoughtListCtrl'
      })
      .when('/thoughts/:thoughtId', {
        templateUrl: 'views/thought-detail.html',
        controller: 'ThoughtDetailCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }]);
