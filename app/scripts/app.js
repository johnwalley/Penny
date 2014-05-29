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
      .when('/thoughts/add', {
        templateUrl: 'views/thought-edit.html',
        controller: 'ThoughtEditCtrl'
      })
      .when('/thoughts/:thoughtId', {
        templateUrl: 'views/thought-detail.html',
        controller: 'ThoughtDetailCtrl'
      })
      .when('/thoughts/edit/:thoughtId', {
        templateUrl: 'views/thought-edit.html',
        controller: 'ThoughtEditCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }]);
