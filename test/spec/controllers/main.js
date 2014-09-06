'use strict';

describe('Controller: ThoughtEditCtrl', function () {

  // load the controller's module
  beforeEach(module('pennyApp'));

  var ThoughtEditCtrl,
    scope,
    mockDropboxThoughts;

  beforeEach(function() {
    mockDropboxThoughts = {
      create: function() {

      }
    }
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, DropboxThoughts) {
    scope = $rootScope.$new();
    ThoughtEditCtrl = $controller('ThoughtEditCtrl', {
      $scope: scope,
      DropboxThoughts: mockDropboxThoughts
    });
  }));

  it('should have no moods to start', function () {
      expect(scope.thought.moods.length).toBe(0);
    });

  it('should add a mood to the list of moods', function () {
      scope.mood = 'Test 1';
      scope.addMood();
      expect(scope.thought.moods.length).toBe(1);
    });

  it('should add and remove moods to and from the list of moods', function () {
      scope.mood = 'Test 1';
      scope.addMood();
      scope.removeMood(0);
      expect(scope.thought.moods.length).toBe(0);
    });
});

describe('Controller: ThoughtListCtrl', function () {

  // load the controller's module
  beforeEach(module('pennyApp'));

  var ThoughtListCtrl,
    scope,
    mockDropboxThoughts;

  beforeEach(inject(function ($q) {
    var thoughts = [ {id: 1}, {id: 2} ];
    mockDropboxThoughts = {
      create: function() {
        var deferred = $q.defer();
        deferred.resolve('Remote call result');
        return deferred.promise;
      },
      query: function () {
        return thoughts;
      },
      remove: function() {
        thoughts.pop();
      }
    };
  }));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, DropboxThoughts) {
    scope = $rootScope.$new();
    ThoughtListCtrl = $controller('ThoughtListCtrl', {
      $scope: scope,
      DropboxThoughts: mockDropboxThoughts
    });
  }));

  it('should have no thoughts to start', function () {
      expect(scope.thoughts.length).toBe(0);
    });

  it('should remove thoughts from the list', function () {
      scope.remove(1);
      expect(scope.thoughts.length).toBe(1);
    });
});
