'use strict';

angular.module('pennyApp')
  .controller('MainCtrl', function ($scope) {

	$scope.moods = [];

	$scope.addMood = function () {
	  $scope.moods.push($scope.mood);
	  $scope.mood = '';
	};

	$scope.removeMood = function (index) {
	  $scope.moods.splice(index, 1);
	};
});
