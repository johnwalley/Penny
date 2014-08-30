'use strict';

var pennyAppControllers = angular.module('pennyApp');

pennyAppControllers
.controller('ThoughtEditCtrl',  ['$scope', '$routeParams', '$location', 'Thoughts', function ($scope, $routeParams, $location, Thoughts) {

	var defaultRating = 5;

	$scope.debug = false;
	$scope.mood = { description: '', rating: defaultRating };

	if ($routeParams.thoughtId) {
		$scope.thought = Thoughts.get($routeParams.thoughtId);
	}
	else {
		$scope.thought = {};
		$scope.thought.moods = [];
	}

	$scope.save = function () {
		Thoughts.store($scope.thought);
    $location.path('thoughts');
	};

  $scope.cancel = function () {
    Thoughts.store($scope.thought);
    $location.path('thoughts');
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
.controller('ThoughtListCtrl', ['$scope', '$location', 'Thoughts', '$modal', 'dropstoreClient', function ($scope, $location, Thoughts, $modal, dropstoreClient) {

  var taskTable;

  var _client = new Dropbox.Client({key: '6b0gayemcg13s4c'});

  $scope.orderProp = '-updated';

  $scope.thoughts = Thoughts.query();

  // Try to finish OAuth authorization.
  _client.authenticate({interactive: false}, function (error) {
      if (error) {
          alert('Authentication error: ' + error);
      }
  });

  if (_client.isAuthenticated()) {
    _client.getDatastoreManager().openDefaultDatastore(function (error, datastore) {
      if (error) {
        alert('Error opening default datastore: ' + error);
      }
      taskTable = datastore.getTable('thoughts');
    });
  }

  $scope.authenticate = function () {

    _client.authenticate();

  };

  $scope.add = function () {
    taskTable.insert({ name: 'John'});
  };

  $scope.confirm = function (id) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      resolve: {
        thought: function () {
          return Thoughts.get(id);
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
    $location.path('thoughts/' + id);
  };

  $scope.edit = function(id) {
    $location.path('thoughts/edit/' + id);
  };

  $scope.remove = function(id) {
    Thoughts.remove(id);
    $scope.thoughts = Thoughts.query();
  };

}]);

pennyAppControllers
.controller('ThoughtDetailCtrl', ['$scope', '$location', '$routeParams', 'Thoughts', function ($scope, $location, $routeParams, Thoughts) {
	
	$scope.thought = Thoughts.get($routeParams.thoughtId);

  $scope.edit = function(id) {
    $location.path('thoughts/edit/' + id);
  };

}]);