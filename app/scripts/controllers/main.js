'use strict';

var pennyAppControllers = angular.module('pennyApp');

pennyAppControllers
.controller('ThoughtEditCtrl',  ['$scope', '$routeParams', '$location', 'DropboxThoughts', 'recordWrapper', function ($scope, $routeParams, $location, DropboxThoughts, recordWrapper) {

  var defaultRating = 5;

  DropboxThoughts.create();

  $scope.recordWrapper = recordWrapper;

  $scope.debug = false;
  $scope.mood = { description: '', rating: defaultRating };

  if ($routeParams.thoughtId) {
    $scope.thought = DropboxThoughts.get($routeParams.thoughtId);
  }
  else {
    $scope.thought = {};
    $scope.thought.moods = [];
  }

  $scope.save = function () {
    DropboxThoughts.store($scope.thought);
    $location.path('/thoughts');
  };

  $scope.cancel = function () {
    DropboxThoughts.store($scope.thought);
    $location.path('/thoughts');
  };

  $scope.addMood = function () {
    $scope.mood.ratingNow = $scope.mood.rating;
    $scope.thought.moods.push($scope.mood);
    $scope.mood = { description: '', rating: defaultRating };
  };

  $scope.removeMood = function (index) {
    $scope.thought.moods.splice(index, 1);
  };
}]);

pennyAppControllers
.controller('ThoughtListCtrl', ['$scope', '$location', 'Thoughts', '$modal', 'DropboxThoughts', function ($scope, $location, Thoughts, $modal, DropboxThoughts) {

  $scope.orderProp = '-update';

  $scope.thoughts = [];

  DropboxThoughts.create().then(function() {
    $scope.thoughts = DropboxThoughts.query();
  });

  $scope.authenticate = function () {

  };

  $scope.add = function () {
    DropboxThoughts.clear();
    $scope.thoughts = DropboxThoughts.query();
  };

  $scope.confirm = function (id) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      resolve: {
        thought: function () {
          return DropboxThoughts.get(id);
        }
      }
    });

    modalInstance.result.then(function () {
      $scope.remove(id);
    }, function () {});
  };

  var ModalInstanceCtrl = function ($scope, $modalInstance, thought) {

    $scope.thought = thought;

    $scope.ok = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  };

  $scope.show = function(id) {
    $location.path('/thoughts/' + id);
  };

  $scope.edit = function(id) {
    $location.path('/thoughts/edit/' + id);
  };

  $scope.remove = function(id) {
    DropboxThoughts.remove(id);
    $scope.thoughts = DropboxThoughts.query();
  };

}]);

pennyAppControllers
.controller('ThoughtDetailCtrl', ['$scope', '$location', '$routeParams', 'DropboxThoughts', function ($scope, $location, $routeParams, DropboxThoughts) {
  
  $scope.thought = DropboxThoughts.get($routeParams.thoughtId);

  $scope.edit = function(id) {
    $location.path('/thoughts/edit/' + id);
  };

}]);