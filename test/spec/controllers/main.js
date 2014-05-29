'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('pennyApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, localStorageService) {
    scope = $rootScope.$new();
    var thought = {};
    thought.moods = [ {description: 'Happy', rating: 3}, {description: 'Sad', rating: 4} ];
    localStorageService.get = function () { return thought; };
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      localStorageService: localStorageService
    });
  }));

  it('should have no items to start', function () {
      expect(scope.thought.moods.length).toBe(2);
    });

  it('should add items to the list', function () {
      scope.mood = 'Test 1';
      scope.addMood();
      expect(scope.thought.moods.length).toBe(3);
    });

  it('should add items to the list', function () {
      scope.mood = 'Test 1';
      scope.addMood();
      scope.removeMood(0);
      expect(scope.thought.moods.length).toBe(2);
    });
});
