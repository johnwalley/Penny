'use strict';

var pennyAppControllers = angular.module('pennyApp');

pennyAppControllers
.controller('MainCtrl', function ($scope, localStorageService) {

	var defaultRating = 5;

	$scope.debug = false;
	$scope.mood = { description: '', rating: defaultRating };

	var thoughtInStore = localStorageService.get('thought');

	if (thoughtInStore) {
		$scope.thought = thoughtInStore;
	}
	else {
		$scope.thought = {};
		$scope.thought.moods = [];
	}

	$scope.save = function () {
		localStorageService.add('thought', angular.toJson($scope.thought));
	};

	$scope.addMood = function () {
		$scope.mood.ratingNow = $scope.mood.rating;
		$scope.thought.moods.push($scope.mood);
		$scope.mood = { description: '', rating: defaultRating };
	};

	$scope.removeMood = function (index) {
		$scope.thought.moods.splice(index, 1);
	};
});

pennyAppControllers
.controller('ThoughtListCtrl', ['$scope', 'Thoughts', function ($scope, Thoughts) {
	
	$scope.thoughts = Thoughts.query();

	$scope.addThought = function() {

	};

}]);

pennyAppControllers
.controller('ThoughtDetailCtrl', ['$scope', '$routeParams', 'Thoughts', function ($scope, $routeParams, Thoughts) {
	
	$scope.thoughts = Thoughts.query();
	$scope.thoughtId = $routeParams.thoughtId;

}]);