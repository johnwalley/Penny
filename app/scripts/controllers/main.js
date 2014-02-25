'use strict';

angular.module('pennyApp')
.controller('MainCtrl', function ($scope) {

	var defaultRating = 5;

	$scope.debug = false;

	$scope.mood = { description: '', rating: defaultRating };

	$scope.thought = {};
	$scope.thought.moods = [ {description: 'Happy', rating: 3},
	{description: 'Sad', rating: 4}];

	$scope.addMood = function () {
		$scope.mood.ratingNow = $scope.mood.rating;
		$scope.thought.moods.push($scope.mood);
		$scope.mood = { description: '', rating: defaultRating };
	};

	$scope.removeMood = function (index) {
		$scope.thought.moods.splice(index, 1);
	};
});
