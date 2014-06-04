'use strict';

describe('Controller: ThoughtEditCtrl', function () {

  // load the controller's module
  beforeEach(module('pennyApp'));

  var ThoughtEditCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ThoughtEditCtrl = $controller('ThoughtEditCtrl', {
      $scope: scope,
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
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, Thoughts) {
    scope = $rootScope.$new();
    var thoughts = [ {id: 1}, {id: 2} ];
    Thoughts.query = function () { return thoughts; };
    Thoughts.remove = function() { thoughts.pop(); };
    ThoughtListCtrl = $controller('ThoughtListCtrl', {
      $scope: scope,
      Thoughts: Thoughts
    });
  }));

  it('should have no thoughts to start', function () {
      expect(scope.thoughts.length).toBe(2);
    });

  it('should remove thoughts from the list', function () {
      scope.remove(1);
      expect(scope.thoughts.length).toBe(1);
    });
});
